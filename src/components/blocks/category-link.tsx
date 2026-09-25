import { SafeLink } from "@/components/ui/safe-link";
import { cn } from "@/lib/utils";

const dotClass = {
  primary: "bg-primary",
  "primary-light": "bg-primary-light",
  peach: "bg-peach",
  lavender: "bg-lavender",
} as const;

export type CategoryDot = keyof typeof dotClass;

export interface CategoryLinkProps {
  label: string;
  /** Catalog filtered by this product type. */
  href: string;
  dot: CategoryDot;
}

/** Product-type pill with a colored dot ("Наполнители", "Лакомства", …). */
export function CategoryLink({ label, href, dot }: CategoryLinkProps) {
  return (
    <SafeLink
      href={href}
      className="bg-surface text-text hover:bg-surface-hover tablet:gap-3.5 tablet:px-6.5 tablet:py-5 tablet:text-[17px] focus-ring flex items-center gap-2.5 rounded-full px-4.5 py-4 text-sm font-bold transition-colors"
    >
      <span
        aria-hidden="true"
        className={cn("tablet:size-3.5 size-3 rounded-full", dotClass[dot])}
      />
      {label}
    </SafeLink>
  );
}
