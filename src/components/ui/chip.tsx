import { type ComponentProps } from "react";
import { cn, type SafeProps } from "@/lib/utils";

export interface ChipProps extends SafeProps<ComponentProps<"button">> {
  /** Selected state; also exposed as `aria-pressed`. */
  active?: boolean;
}

/** Filter chip / toggle pill: 44px (40px on mobile), primary when active. */
export function Chip({
  active = false,
  type = "button",
  className,
  ...props
}: ChipProps) {
  return (
    <button
      type={type}
      aria-pressed={active}
      className={cn(
        "inline-flex h-10 items-center rounded-full px-4 text-[13px] font-semibold whitespace-nowrap transition-colors",
        "tablet:h-11 tablet:px-4.5 tablet:text-sm focus-ring",
        active
          ? "bg-primary text-text-inverse hover:bg-primary-hover"
          : "bg-surface text-text hover:bg-surface-hover",
        className,
      )}
      {...props}
    />
  );
}
