"use client";

import { type ComponentProps, type ReactNode } from "react";
import { cn, type SafeProps } from "@/lib/utils";
import { Field, fieldControlClass, useFieldA11y } from "./field";

export interface InputProps extends SafeProps<
  Omit<ComponentProps<"input">, "children">
> {
  label?: ReactNode;
  hint?: string;
  /** Error message; also switches the field to the error state. */
  error?: string;
}

export function Input({
  label,
  hint,
  error,
  id,
  className,
  "aria-describedby": describedBy,
  ...props
}: InputProps) {
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
      <input
        {...props}
        {...controlProps}
        className={cn(
          fieldControlClass(Boolean(error)),
          "tablet:h-[52px] tablet:px-4.5 h-[50px] px-4",
          className,
        )}
      />
    </Field>
  );
}
