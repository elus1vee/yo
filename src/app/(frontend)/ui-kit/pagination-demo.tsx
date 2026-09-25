"use client";

import { useState } from "react";
import { Pagination } from "@/components/ui/pagination";

/** Client-side state for the interactive Pagination examples. */
export function PaginationDemo({
  pageCount,
  initialPage = 1,
}: {
  pageCount: number;
  initialPage?: number;
}) {
  const [page, setPage] = useState(initialPage);
  return (
    <div className="flex flex-col gap-2">
      <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
      <span className="text-text-muted text-xs">
        страница {page} из {pageCount}
      </span>
    </div>
  );
}
