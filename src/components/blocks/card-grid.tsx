import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Grids from the handoff's breakpoint rules: 1 column below `tablet`,
 * 2 columns from `tablet`, 3 from `desktop`.
 *
 * - products: wrapping row of cards that keep their width instead of
 *   stretching (README: "фото не должно терять качество"), so 1–2 products
 *   don't blow up. Card basis = (100% − 3 gaps) / 4, min 260px.
 * - catalog:  like products, capped at 310px per card.
 * - triple:   3 columns from `desktop` (animals, news).
 * - pair:     2 columns from `lg`.
 * - split:    two equal columns from `lg` (product gallery | info).
 * - pills:    2 columns, 4 from `lg`.
 */
const layouts = {
  products:
    "flex flex-col gap-3 tablet:flex-row tablet:flex-wrap tablet:gap-5 tablet:[&>*]:min-w-[260px] tablet:[&>*]:flex-[0_1_calc((100%_-_60px)/4)]",
  /* Catalog: same, but cards never grow past 310px (README). */
  catalog:
    "flex flex-col gap-3.5 tablet:flex-row tablet:flex-wrap tablet:gap-5 tablet:[&>*]:max-w-[310px] tablet:[&>*]:min-w-[260px] tablet:[&>*]:flex-[0_1_calc((100%_-_60px)/4)]",
  triple: "grid gap-3 tablet:grid-cols-2 tablet:gap-5 desktop:grid-cols-3",
  pair: "grid gap-3 tablet:gap-5 lg:grid-cols-2",
  /* Two halves (gallery | info), 56px apart from `lg`. */
  split: "grid gap-5 lg:grid-cols-2 lg:gap-14",
  pills: "grid grid-cols-2 gap-2.5 tablet:gap-4 lg:grid-cols-4",
} as const;

export interface CardGridProps {
  layout: keyof typeof layouts;
  children: ReactNode;
  className?: string;
}

export function CardGrid({ layout, children, className }: CardGridProps) {
  return <div className={cn(layouts[layout], className)}>{children}</div>;
}
