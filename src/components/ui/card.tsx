import { type ComponentProps } from "react";
import { cn, type SafeProps } from "@/lib/utils";

const shadowClasses = {
  none: "",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
} as const;

export interface CardProps extends SafeProps<ComponentProps<"div">> {
  /** Resting shadow. The styleguide's cards have none until hovered. */
  shadow?: keyof typeof shadowClasses;
  /** Lifts the card (shadow-hover + translateY(-3px)) on hover. */
  interactive?: boolean;
  /** Element to render; `article` for self-contained items (product, news). */
  as?: "div" | "article";
}

export function Card({
  as: Tag = "div",
  shadow = "none",
  interactive = false,
  className,
  ...props
}: CardProps) {
  return (
    <Tag
      className={cn(
        "bg-surface rounded-lg p-4",
        shadowClasses[shadow],
        interactive &&
          "hover:shadow-hover transition-[transform,box-shadow] duration-150 hover:-translate-y-[3px] motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        className,
      )}
      {...props}
    />
  );
}
