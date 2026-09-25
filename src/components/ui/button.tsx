import { type ComponentProps } from "react";
import { cn, type SafeProps } from "@/lib/utils";

/**
 * primary / secondary / dark are from the design system; `light` is the
 * plain surface-colored pill used for secondary CTAs on colored panels;
 * `outline` is the bordered "Показать ещё" button. `ghost` is not in
 * the handoff — it's modelled on the menu-item pill (transparent,
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
  dark: {
    base: "bg-surface-inverse text-text-inverse",
    interactive: "hover:bg-dark-hover active:bg-dark-hover",
  },
  light: {
    base: "bg-surface text-text",
    interactive: "hover:bg-surface-hover active:bg-surface-tint",
  },
  outline: {
    base: "border border-border-strong bg-surface text-text",
    interactive: "hover:bg-surface-hover active:bg-surface-tint",
  },
  ghost: {
    base: "bg-transparent text-text",
    interactive: "hover:bg-surface-hover active:bg-surface-tint",
  },
} as const;

const sizeClasses = {
  sm: "h-11 px-5.5 text-[14px]",
  md: "h-[52px] px-7 text-button",
  lg: "h-[58px] px-8 text-[16px]",
} as const;

export type ButtonVariant = keyof typeof variantClasses;
export type ButtonSize = keyof typeof sizeClasses;

interface ButtonClassOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

/** Shared by <Button> and <ButtonLink> so a link can look like a button. */
export function buttonClassName({
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  className,
}: ButtonClassOptions = {}) {
  const v = variantClasses[variant];
  return cn(
    "inline-flex items-center justify-center gap-2.5 rounded-full font-bold whitespace-nowrap transition-colors",
    "focus-ring",
    sizeClasses[size],
    disabled
      ? cn(
          "cursor-not-allowed text-disabled-text",
          variant !== "ghost" && "bg-disabled-bg",
        )
      : cn(v.base, loading ? "cursor-wait opacity-85" : v.interactive),
    className,
  );
}

export interface ButtonProps extends SafeProps<
  Omit<ComponentProps<"button">, "children">
> {
  variant?: ButtonVariant;
  size?: ButtonSize;
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
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={buttonClassName({
        variant,
        size,
        loading,
        disabled,
        className,
      })}
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
