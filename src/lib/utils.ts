import { DEFAULT_CURRENCY_FORMAT, DefaultCurrency } from "../config";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  price: number | string,
  option: {
    currency?: DefaultCurrency;
    notation?: Intl.NumberFormatOptions["notation"];
  } = {}
) {
  const { currency = DEFAULT_CURRENCY_FORMAT, notation = "compact" } = option;
  const numericPrice = typeof price === "string" ? parseInt(price) : price;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation,
    maximumFractionDigits: 2,
  }).format(numericPrice);
}
