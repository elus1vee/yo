"use client";

import { useRef, useState } from "react";
import { Pagination } from "@/components/ui/pagination";
import { CardGrid } from "./card-grid";
import { NewsCard, type NewsCardProps } from "./news-card";
import { Section } from "./section";

export interface NewsListProps {
  /** Hidden h2 above the grid (keeps the heading outline intact). */
  title: string;
  /** All items, newest first; the list slices them into pages. */
  items: NewsCardProps[];
  /** Cards per page (the mockup shows 3, production is meant to use 9). */
  pageSize?: number;
  /** 1-based page to open with, e.g. from `/news?page=2`. Clamped to range. */
  initialPage?: number;
}

/**
 * Paginated news grid. The page number lives in client state and is mirrored
 * to `?page=` (replaceState, no navigation) so a page can be shared.
 */
export function NewsList({
  title,
  items,
  pageSize = 9,
  initialPage = 1,
}: NewsListProps) {
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  const clamp = (n: number) =>
    Math.min(Math.max(Math.trunc(n) || 1, 1), pageCount);
  const [page, setPage] = useState(() => clamp(initialPage));
  const listRef = useRef<HTMLDivElement>(null);

  const visible = items.slice((page - 1) * pageSize, page * pageSize);

  const goTo = (next: number) => {
    const target = clamp(next);
    setPage(target);
    const url = new URL(window.location.href);
    if (target === 1) url.searchParams.delete("page");
    else url.searchParams.set("page", String(target));
    window.history.replaceState(null, "", url);
    listRef.current?.scrollIntoView({ block: "start" });
  };

  return (
    <Section
      srTitle={title}
      inset="page"
      className="tablet:pt-4 tablet:pb-10 pt-2 pb-8"
    >
      <div ref={listRef} className="scroll-mt-28">
        <CardGrid layout="news">
          {visible.map((item) => (
            <NewsCard key={item.href} variant="list" {...item} />
          ))}
        </CardGrid>
      </div>
      <Pagination
        page={page}
        pageCount={pageCount}
        onPageChange={goTo}
        className="tablet:pt-4 pt-1.5"
      />
    </Section>
  );
}
