"use client";

import { type ComponentProps, type ReactNode } from "react";
import { cn, type SafeProps } from "@/lib/utils";
import { Field, fieldControlClass, useFieldA11y } from "./field";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends SafeProps<
  Omit<ComponentProps<"select">, "children">
> {
  options: SelectOption[];
  /** Empty first option, e.g. "Все животные". Selecting it clears the filter. */
  placeholder?: string;
  label?: ReactNode;
  hint?: string;
  /** Error message; also switches the field to the error state. */
  error?: string;
}

/**
 * Native <select> styled like the other fields. Not in the handoff (its
 * filters are chip groups); a native control keeps keyboard, screen-reader
 * and mobile-picker behavior for free.
 */
export function Select({
  options,
  placeholder,
  label,
  hint,
  error,
  id,
  className,
  "aria-describedby": describedBy,
  ...props
}: SelectProps) {
  const { fieldId, errorId, hintId, controlProps } = useFieldA11y({
    id,
    error,
    hint,
    describedBy,
  });

  return (
    <Field
      id={fieldId}
      label={label}
      hint={hint}
      hintId={hintId}
      error={error}
      errorId={errorId}
    >
      <div className="relative">
        <select
          {...props}
          {...controlProps}
          className={cn(
            fieldControlClass(Boolean(error)),
            "tablet:h-[52px] tablet:pl-4.5 h-[50px] cursor-pointer appearance-none pr-11 pl-4",
            className,
          )}
        >
          {placeholder !== undefined && <option value="">{placeholder}</option>}
          {options.map((o) => (
            <option key={o.value} value={o.value} disabled={o.disabled}>
              {o.label}
            </option>
          ))}
        </select>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-text-muted pointer-events-none absolute top-1/2 right-4 -translate-y-1/2"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </Field>
  );
}
