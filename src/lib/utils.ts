import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class names, resolving conflicts (e.g. `p-2` vs `p-4`)
 * in favor of the last one.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
