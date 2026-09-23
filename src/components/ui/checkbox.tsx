"use client";

import { type ComponentProps, type ReactNode } from "react";
import { cn, type SafeProps } from "@/lib/utils";
import { useFieldA11y } from "./field";

export interface CheckboxProps extends SafeProps<
  Omit<ComponentProps<"input">, "type" | "children">
> {
  /** Label content. Pass JSX (e.g. a <Link>) rather than an HTML string. */
  label: ReactNode;
  /** Error message; also switches the checkbox to the error state. */
  error?: string;
}

export function Checkbox({
  label,
  error,
  id,
  className,
  disabled,
  "aria-describedby": describedBy,
  ...props
}: CheckboxProps) {
  const { fieldId, errorId, controlProps } = useFieldA11y({
    id,
    error,
    describedBy,
  });

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={fieldId}
        className={cn(
          "flex items-start gap-2.5 text-sm",
          disabled ? "text-disabled-text cursor-not-allowed" : "cursor-pointer",
        )}
      >
        <input
          {...props}
          {...controlProps}
          type="checkbox"
          disabled={disabled}
          className={cn(
            "accent-primary mt-0.5 size-[18px] shrink-0 rounded-[4px]",
            "focus-visible:outline-primary focus-visible:outline-2 focus-visible:outline-offset-2",
            error && "outline-danger outline-2",
            disabled && "cursor-not-allowed",
            className,
          )}
        />
        <span>{label}</span>
      </label>
      {error && (
        <p id={errorId} className="text-danger pl-7 text-xs">
          {error}
        </p>
      )}
    </div>
  );
}
