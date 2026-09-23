"use client";

import { type ReactNode, useId } from "react";
import { cn } from "@/lib/utils";

/**
 * Shared plumbing for Input / Textarea / Select: label + hint + error
 * wiring (`htmlFor`, `aria-describedby`, `aria-invalid`) and the control
 * styles from the design system's "Текстовое поле" states.
 *
 * All text (label, hint, error) is rendered as React children, i.e.
 * escaped — never as HTML.
 */

export function useFieldA11y({
  id,
  error,
  hint,
  describedBy,
}: {
  id?: string;
  error?: string;
  hint?: string;
  describedBy?: string;
}) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const errorId = error ? `${fieldId}-error` : undefined;
  // The hint is replaced by the error message, so only reference one.
  const hintId = hint && !error ? `${fieldId}-hint` : undefined;
  const ids = [describedBy, errorId, hintId].filter(Boolean).join(" ");

  return {
    fieldId,
    errorId,
    hintId,
    controlProps: {
      id: fieldId,
      "aria-invalid": error ? (true as const) : undefined,
      "aria-describedby": ids || undefined,
    },
  };
}

/** Control (input / textarea / select) classes shared across states. */
export function fieldControlClass(invalid: boolean) {
  return cn(
    "w-full rounded-field border bg-bg text-[15px] text-text transition-colors",
    "placeholder:text-text-muted/70 focus:outline-none",
    "disabled:cursor-not-allowed disabled:border-border-subtle disabled:bg-disabled-bg disabled:text-disabled-text",
    invalid
      ? "border-danger shadow-error-field"
      : "border-border-subtle focus:border-primary focus:bg-surface focus:shadow-focus-field",
  );
}

interface FieldProps {
  id: string;
  label?: ReactNode;
  hint?: string;
  hintId?: string;
  error?: string;
  errorId?: string;
  className?: string;
  children: ReactNode;
}

export function Field({
  id,
  label,
  hint,
  hintId,
  error,
  errorId,
  className,
  children,
}: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && (
        <label
          htmlFor={id}
          className={cn(
            "text-[13px] font-semibold",
            error ? "text-danger" : "text-text-muted",
          )}
        >
          {label}
        </label>
      )}
      {children}
      {hint && !error && (
        <p id={hintId} className="text-text-muted text-xs">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-danger text-xs">
          {error}
        </p>
      )}
    </div>
  );
}
