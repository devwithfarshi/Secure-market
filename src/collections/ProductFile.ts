import { Product, User } from "../payload-types";
import { BeforeChangeHook } from "payload/dist/collections/config/types";
import { Access, CollectionConfig } from "payload/types";

const addUser: BeforeChangeHook = ({ req, data }) => {
  const user = req.user as User | null;
  return { ...data, user: user?.id };
};
const yourOwnAndPurchased: Access = async ({ req }) => {
  const user = req.user as User | null;
  if (!user) return false;

  if (user?.role === "admin") return true;
  const { docs: products } = await req.payload.find({
    collection: "products",
    depth: 2,
    where: {
      user: {
        equals: user.id,
      },
    },
  });
  const ownProductFileIds = products.map((prod) => prod.product_files).flat();
  const { docs: orders } = await req.payload.find({
    collection: "orders",
    depth: 0,
    where: {
      user: {
        equals: user.id,
      },
    },
  });
  const purchasedProductFileIds = orders
    .map((order) => {
      return (order.products as Product[]).map((product) => {
        if (typeof product === "string")
          return req.payload.logger.error("Product ID is not a string");
        return typeof product.product_files === "string"
          ? product.product_files
          : product.product_files.id;
      });
    })
    .filter(Boolean)
    .flat();
  return {
    id: {
      in: [...ownProductFileIds, ...purchasedProductFileIds],
    },
  };
};
export const ProductFiles: CollectionConfig = {
  slug: "product_files",
  admin: {
    hidden: ({ user }) => user.role !== "admin",
  },
  hooks: {
    beforeChange: [addUser],
  },
  access: {
    read: yourOwnAndPurchased,
    update: ({ req }) => req.user?.role === "admin",
    delete: ({ req }) => req.user?.role === "admin",
  },
  upload: {
    staticURL: "/product_files",
    staticDir: "product_files",
    mimeTypes: [
      "image/*",
      "application/pdf",
      "application/zip",
      "font/*",
      "application/postscript",
    ],
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      admin: {
        condition: () => false,
      },
      hasMany: false,
    },
  ],
};
