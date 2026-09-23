import { type ComponentProps } from "react";
import { cn, type SafeProps } from "@/lib/utils";

/**
 * Variants: primary / secondary come from the design system. `ghost` is
 * not in the handoff — it's modelled on the menu-item pill (transparent,
 * surface-hover on hover) and is a draft until confirmed.
 */
const variantClasses = {
  primary: {
    base: "bg-primary text-text-inverse",
    interactive: "hover:bg-primary-hover active:bg-primary-active",
  },
  secondary: {
    base: "bg-primary-tint text-text",
    interactive: "hover:bg-primary-tint-hover active:bg-primary-tint-active",
  },
  ghost: {
    base: "bg-transparent text-text",
    interactive: "hover:bg-surface-hover active:bg-surface-tint",
  },
} as const;

const sizeClasses = {
  sm: "h-11 px-[22px] text-[14px]",
  md: "h-[52px] px-7 text-button",
  lg: "h-[58px] px-8 text-[16px]",
} as const;

export interface ButtonProps extends SafeProps<
  Omit<ComponentProps<"button">, "children">
> {
  variant?: keyof typeof variantClasses;
  size?: keyof typeof sizeClasses;
  /** Shows a spinner, blocks clicks and sets `aria-busy`. */
  loading?: boolean;
  /** Replaces the label while loading, e.g. "Отправка…". */
  loadingText?: string;
  children?: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  loadingText,
  disabled = false,
  type = "button", // never submit a form by accident
  className,
  children,
  ...props
}: ButtonProps) {
  const v = variantClasses[variant];

  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        "inline-flex items-center justify-center gap-2.5 rounded-full font-bold whitespace-nowrap transition-colors",
        "focus-visible:shadow-focus-button focus-visible:outline-none",
        sizeClasses[size],
        disabled
          ? cn(
              "text-disabled-text cursor-not-allowed",
              variant !== "ghost" && "bg-disabled-bg",
            )
          : cn(v.base, loading ? "cursor-wait opacity-85" : v.interactive),
        className,
      )}
      {...props}
    >
      {loading && (
        <span
          aria-hidden="true"
          className="size-4 animate-spin rounded-full border-2 border-current/40 border-t-current"
        />
      )}
      {loading && loadingText ? loadingText : children}
    </button>
  );
}
