"use client";
import { Product } from "@/payload-types";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";

const AddToCartButton = ({ product }: { product: Product }) => {
  const { addItem, items } = useCart();
  const isAdded = items.some((item) => item.product.id === product.id);
  return (
    <>
      <Button
        onClick={() => {
          if (isAdded) {
            toast.info("Item already added to cart.", { duration: 1000 });
          } else {
            addItem(product);
          }
        }}
        size="lg"
        className="w-full"
      >
        {isAdded ? "Added!" : "Add to cart"}
      </Button>
    </>
  );
};
export default AddToCartButton;
