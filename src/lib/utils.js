import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function parseNumber(number) {
  const numberWithComma = /,/.test(number);

  if (numberWithComma) {
    const numberWithPoint = number.replace(",", ".");
    return parseFloat(numberWithPoint);
  }

  return parseFloat(number);
}
