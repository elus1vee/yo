"use client";

import { cn } from "@/lib/utils";

export interface PaginationProps {
  /** Current page, 1-based. */
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  /** How many page numbers to show on each side of the current one. */
  siblingCount?: number;
  className?: string;
}

type Item = number | "gap-start" | "gap-end";

/**
 * Always shows first and last page and collapses the rest into "…".
 * The number of items stays constant (siblings * 2 + 5) so the row doesn't
 * change width while paging.
 */
function getItems(page: number, total: number, siblings: number): Item[] {
  const shown = siblings * 2 + 5; // first, last, current ± siblings, 2 gaps
  const range = (from: number, to: number) =>
    Array.from({ length: to - from + 1 }, (_, i) => from + i);

  if (total <= shown) return range(1, total);

  const showStartGap = page - siblings > 3;
  const showEndGap = page + siblings < total - 2;
  const edge = siblings * 2 + 3; // pages shown next to the single gap

  if (!showStartGap) return [...range(1, edge), "gap-end", total];
  if (!showEndGap) return [1, "gap-start", ...range(total - edge + 1, total)];
  return [
    1,
    "gap-start",
    ...range(page - siblings, page + siblings),
    "gap-end",
    total,
  ];
}

/** Numbers only: never trust a prop to be a sane integer. */
function toInt(value: number, fallback: number) {
  return Number.isFinite(value) ? Math.trunc(value) : fallback;
}

const circle =
  "inline-flex size-[38px] items-center justify-center rounded-full transition-colors focus-ring tablet:size-11";

function Arrow({ direction }: { direction: "prev" | "next" }) {
  return (
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
    >
      <path d={direction === "next" ? "m9 6 6 6-6 6" : "M15 6 9 12l6 6"} />
    </svg>
  );
}

export function Pagination({
  page,
  pageCount,
  onPageChange,
  siblingCount = 1,
  className,
}: PaginationProps) {
  const total = Math.max(1, toInt(pageCount, 1));
  const current = Math.min(Math.max(toInt(page, 1), 1), total);
  if (total <= 1) return null;

  const items = getItems(current, total, Math.max(0, toInt(siblingCount, 1)));

  const arrow = (direction: "prev" | "next") => {
    const target = direction === "prev" ? current - 1 : current + 1;
    const disabled = target < 1 || target > total;
    return (
      <button
        type="button"
        disabled={disabled}
        aria-label={
          direction === "prev" ? "Предыдущая страница" : "Следующая страница"
        }
        onClick={() => onPageChange(target)}
        className={cn(
          circle,
          disabled
            ? "bg-disabled-bg text-disabled-text cursor-not-allowed"
            : "border-border-strong bg-surface text-text hover:bg-surface-hover border",
        )}
      >
        <Arrow direction={direction} />
      </button>
    );
  };

  return (
    <nav aria-label="Пагинация" className={className}>
      <ul className="tablet:gap-2 flex flex-wrap items-center justify-center gap-1.5">
        <li>{arrow("prev")}</li>
        {items.map((item) =>
          typeof item === "string" ? (
            <li
              key={item}
              aria-hidden="true"
              className="text-text-muted inline-flex size-11 items-center justify-center"
            >
              …
            </li>
          ) : (
            <li key={item}>
              <button
                type="button"
                aria-label={`Страница ${item}`}
                aria-current={item === current ? "page" : undefined}
                onClick={() => onPageChange(item)}
                className={cn(
                  circle,
                  "tablet:text-[15px] text-sm font-bold",
                  item === current
                    ? "bg-primary text-text-inverse hover:bg-primary-hover"
                    : "bg-surface text-text hover:bg-surface-hover",
                )}
              >
                {item}
              </button>
            </li>
          ),
        )}
        <li>{arrow("next")}</li>
      </ul>
    </nav>
  );
}
