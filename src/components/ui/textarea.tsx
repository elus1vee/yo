"use client";

import { type ComponentProps, type ReactNode } from "react";
import { cn, type SafeProps } from "@/lib/utils";
import { Field, fieldControlClass, useFieldA11y } from "./field";

export interface TextareaProps extends SafeProps<
  Omit<ComponentProps<"textarea">, "children">
> {
  label?: ReactNode;
  hint?: string;
  /** Error message; also switches the field to the error state. */
  error?: string;
}

export function Textarea({
  label,
  hint,
  error,
  id,
  rows = 4,
  className,
  "aria-describedby": describedBy,
  ...props
}: TextareaProps) {
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
      <textarea
        rows={rows}
        {...props}
        {...controlProps}
        className={cn(
          fieldControlClass(Boolean(error)),
          "tablet:px-[18px] tablet:py-4 resize-none px-4 py-3.5",
          className,
        )}
      />
    </Field>
  );
}
