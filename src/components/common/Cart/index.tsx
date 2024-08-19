"use client";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import routenames from "@/data/rotues.data";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import { Loader2, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CartItem from "./CartItem";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useState, useEffect } from "react";

const Cart = () => {
  const { items } = useCart();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const itemCount = items.length;
  const cartTotal = items.reduce((acc, item) => acc + item.product.price, 0);
  const fee = 1;
  return (
    <Sheet>
      <SheetTrigger className="group -m-2 flex items-center p-2">
        {isMounted ? (
          <>
            <ShoppingCart
              aria-hidden="true"
              className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
            />
            <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
              {isMounted ? itemCount : 0}
            </span>
          </>
        ) : (
          <>
            <div className="animate-spin">
              <Loader2 className="size-4" />
            </div>
          </>
        )}
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>Cart ({isMounted ? itemCount : 0})</SheetTitle>
        </SheetHeader>
        {itemCount > 0 ? (
          <>
            <div className="flex w-full flex-col pr-6">
              <ScrollArea>
                {items.map(({ product }) => (
                  <CartItem product={product} key={product.id} />
                ))}
              </ScrollArea>
            </div>
            <div className="space-y-4 pr-6">
              <Separator />
              <div className="space-y-1.5 text-sm">
                <div className="flex">
                  <span className="flex-1">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Transaction Fee</span>
                  <span>{formatPrice(fee)}</span>
                </div>
                <div className="flex">
                  <span className="flex-1"> Total</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
              </div>
              <SheetFooter>
                <SheetTrigger asChild>
                  <Link
                    href={routenames.cart}
                    className={buttonVariants({
                      className: "w-full font-medium",
                    })}
                  >
                    Continue to Checkout
                  </Link>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div
              aria-hidden="true"
              className="relative mb-4 size-60 text-muted-foreground"
            >
              <Image src={"/hippo-empty-cart.png"} alt="Cart is empty" fill />
            </div>
            <div className="text-xl font-semibold">Your cart is empty</div>
            <SheetTrigger asChild>
              <Link
                href={routenames.products}
                className={buttonVariants({
                  variant: "link",
                  size: "sm",
                  className: "text-sm text-muted-foreground",
                })}
              >
                Add items to your cart to checkout
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
export default Cart;
