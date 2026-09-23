import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge doesn't know our custom theme keys, so without this
 * `text-button` (font size) would be treated as a text *color* and clash
 * with `text-text-inverse`, and `shadow-focus-button` would be dropped
 * next to another shadow, etc.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display",
            "h1",
            "h2",
            "h3",
            "h4",
            "body-lg",
            "body",
            "small",
            "label",
            "button",
          ],
        },
      ],
      shadow: [
        {
          shadow: ["hover", "focus-button", "focus-field", "error-field"],
        },
      ],
      rounded: [{ rounded: ["field"] }],
    },
  },
});

/**
 * Merge Tailwind class names, resolving conflicts (e.g. `p-2` vs `p-4`)
 * in favor of the last one.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Props type for ui components that spread `...props` onto a DOM element.
 * Removes `dangerouslySetInnerHTML` so a caller can't inject raw HTML
 * through a component that is otherwise text-only (XSS hardening).
 */
export type SafeProps<T> = Omit<T, "dangerouslySetInnerHTML">;
