"use client";

import { useId } from "react";
import { Chip } from "@/components/ui/chip";

export interface FilterOption {
  id: string;
  label: string;
}

export interface FilterGroupProps {
  /** Small caps group title, e.g. "по животным". */
  label: string;
  options: FilterOption[];
  /** Selected option id, or null. */
  value: string | null;
  /** Called with the new id, or null when the active chip is clicked again. */
  onChange: (value: string | null) => void;
}

/** Single-select group of chips; clicking the active chip clears it. */
export function FilterGroup({
  label,
  options,
  value,
  onChange,
}: FilterGroupProps) {
  const labelId = useId();

  return (
    <div className="flex flex-col gap-2.5">
      <span
        id={labelId}
        className="text-text-muted tablet:text-xs tablet:tracking-[0.12em] text-[11px] font-bold tracking-[0.1em] uppercase"
      >
        {label}
      </span>
      <div
        role="group"
        aria-labelledby={labelId}
        className="tablet:gap-2.5 flex flex-wrap gap-2"
      >
        {options.map((option) => (
          <Chip
            key={option.id}
            active={value === option.id}
            onClick={() => onChange(value === option.id ? null : option.id)}
          >
            {option.label}
          </Chip>
        ))}
      </div>
    </div>
  );
}
