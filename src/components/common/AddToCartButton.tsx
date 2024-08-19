"use client";
import { Product } from "@/payload-types";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useCart } from "@/hooks/useCart";

const AddToCartButton = ({ product }: { product: Product }) => {
  const { addItem } = useCart();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false);
    }, 1500);
    return () => clearTimeout(timeout);
  }, [isSuccess]);
  return (
    <>
      <Button
        onClick={() => {
          addItem(product);
          setIsSuccess(true);
        }}
        size="lg"
        className="w-full"
      >
        {isSuccess ? "Added!" : "Add to cart"}
      </Button>
    </>
  );
};
export default AddToCartButton;
