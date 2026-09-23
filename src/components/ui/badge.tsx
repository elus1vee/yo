import { type ComponentProps } from "react";
import { cn, type SafeProps } from "@/lib/utils";

/**
 * Tag / pill for scent, volume, category. Tints come from the product-line
 * colors; `strong` gives the saturated version (e.g. the filled "Peach" tag
 * in the styleguide).
 */
const toneClasses = {
  neutral: {
    tint: "bg-surface-tint text-text-muted",
    strong: "bg-surface-inverse text-text-inverse",
  },
  primary: {
    tint: "bg-primary-tint text-text",
    strong: "bg-primary text-text-inverse",
  },
  peach: { tint: "bg-peach-tint text-text", strong: "bg-peach text-text" },
  lavender: {
    tint: "bg-lavender-tint text-text",
    strong: "bg-lavender text-text",
  },
} as const;

export interface BadgeProps extends SafeProps<ComponentProps<"span">> {
  tone?: keyof typeof toneClasses;
  strong?: boolean;
  /** Greyed-out look, e.g. "Нет в наличии". */
  disabled?: boolean;
}

export function Badge({
  tone = "neutral",
  strong = false,
  disabled = false,
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-[13px] py-[7px] text-xs font-bold whitespace-nowrap",
        disabled
          ? "bg-disabled-bg text-disabled-text"
          : toneClasses[tone][strong ? "strong" : "tint"],
        className,
      )}
      {...props}
    />
  );
}
