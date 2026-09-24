import { cn } from "@/lib/utils";

/** Same tints as the product-line colors; see CardTint in blocks/types. */
const stripeClass = {
  neutral: "[--stripe:var(--color-surface-tint)]",
  peach: "[--stripe:var(--color-peach-tint)]",
  lavender: "[--stripe:var(--color-lavender-tint)]",
  primary: "[--stripe:var(--color-primary-tint)]",
} as const;

export interface ImagePlaceholderProps {
  /** Mono caption describing the missing photo, e.g. "фото кошки". */
  caption?: string;
  tint?: keyof typeof stripeClass;
  align?: "center" | "bottom";
  /** Extra classes for the caption, e.g. to hide it on small screens. */
  captionClassName?: string;
  className?: string;
}

/**
 * Striped stand-in for photos that haven't been delivered yet (the handoff
 * uses these everywhere except the two pack shots). Fills its parent.
 */
export function ImagePlaceholder({
  caption,
  tint = "neutral",
  align = "center",
  captionClassName,
  className,
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        "flex size-full bg-[repeating-linear-gradient(135deg,var(--color-surface)_0_10px,color-mix(in_oklab,var(--stripe)_45%,var(--color-surface))_10px_20px)]",
        stripeClass[tint],
        align === "center"
          ? "items-center justify-center"
          : "tablet:p-[22px] items-end p-[18px]",
        className,
      )}
    >
      {caption && (
        <span
          className={cn(
            "text-text-muted font-mono text-[10px] tracking-[0.08em] uppercase",
            captionClassName,
          )}
        >
          {caption}
        </span>
      )}
    </div>
  );
}
