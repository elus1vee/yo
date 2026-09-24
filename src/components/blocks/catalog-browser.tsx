"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { type Copy } from "@/components/ui/responsive-text";
import { CardGrid } from "./card-grid";
import { EmptyState } from "./empty-state";
import { type FilterOption, FilterGroup } from "./filter-group";
import {
  type CatalogProduct,
  CatalogProductCard,
} from "./catalog-product-card";
import { Section } from "./section";

export interface CatalogCopy {
  animalsLabel: string;
  typesLabel: string;
  reset: string;
  loadMore: string;
  /** Screen-reader announcement; `{count}` is replaced with the number found. */
  found: string;
  productCta: string;
  empty: { title: string; description: Copy };
}

export interface CatalogBrowserProps {
  products: CatalogProduct[];
  animals: FilterOption[];
  types: FilterOption[];
  copy: CatalogCopy;
  /** Preselected filters, e.g. from `/catalog?animal=cats`. Unknown ids are ignored. */
  initialAnimal?: string;
  initialType?: string;
  /** How many cards show at first, and how many each "load more" adds. */
  pageSize?: number;
  loadMoreStep?: number;
}

const knownId = (id: string | undefined, options: FilterOption[]) =>
  options.find((o) => o.id === id)?.id ?? null;

const sectionClass = "px-[18px] tablet:px-10";

/**
 * Catalog listing with two independent single-select filters (animal and
 * product type, combined with AND), a "load more" pager and an empty state.
 * Filtering is client-side state; changing a filter resets the pager.
 */
export function CatalogBrowser({
  products,
  animals,
  types,
  copy,
  initialAnimal,
  initialType,
  pageSize = 8,
  loadMoreStep = 4,
}: CatalogBrowserProps) {
  const [animal, setAnimal] = useState(() => knownId(initialAnimal, animals));
  const [type, setType] = useState(() => knownId(initialType, types));
  const [visibleCount, setVisibleCount] = useState(pageSize);

  const typeLabel = useMemo(
    () => new Map(types.map((t) => [t.id, t.label])),
    [types],
  );
  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          (!animal || p.animals.includes(animal)) && (!type || p.type === type),
      ),
    [products, animal, type],
  );
  const visible = filtered.slice(0, visibleCount);
  const remaining = filtered.length - visible.length;
  const hasFilters = animal !== null || type !== null;

  const changeAnimal = (id: string | null) => {
    setAnimal(id);
    setVisibleCount(pageSize);
  };
  const changeType = (id: string | null) => {
    setType(id);
    setVisibleCount(pageSize);
  };
  const reset = () => {
    setAnimal(null);
    setType(null);
    setVisibleCount(pageSize);
  };

  return (
    <>
      <Section
        className={`${sectionClass} tablet:pb-10 pb-6`}
        containerClassName="gap-4 tablet:gap-5"
      >
        <FilterGroup
          label={copy.animalsLabel}
          options={animals}
          value={animal}
          onChange={changeAnimal}
        />
        <FilterGroup
          label={copy.typesLabel}
          options={types}
          value={type}
          onChange={changeType}
        />
        {hasFilters && (
          <Button
            variant="light"
            size="sm"
            onClick={reset}
            className="border-peach bg-peach-tint hover:bg-peach-hover tablet:h-10 tablet:gap-2 tablet:pr-[18px] tablet:pl-2 tablet:text-[13px] h-[38px] gap-[7px] self-start border pr-3.5 pl-1.5 text-xs"
          >
            <span
              aria-hidden="true"
              className="bg-surface text-danger tablet:size-[22px] tablet:text-sm flex size-5 items-center justify-center rounded-full text-[13px] leading-none"
            >
              ×
            </span>
            {copy.reset}
          </Button>
        )}
      </Section>

      <Section
        className={`${sectionClass} tablet:pb-24 pb-12`}
        containerClassName="gap-0 tablet:gap-0"
      >
        <p role="status" className="sr-only">
          {copy.found.replace("{count}", String(filtered.length))}
        </p>

        {filtered.length === 0 ? (
          <EmptyState
            title={copy.empty.title}
            description={copy.empty.description}
          >
            <Button
              variant="primary"
              size="sm"
              onClick={reset}
              className="tablet:h-12 tablet:px-[26px] tablet:text-[15px] h-[46px] px-[22px] text-sm"
            >
              {copy.reset}
            </Button>
          </EmptyState>
        ) : (
          <CardGrid layout="catalog">
            {visible.map((product) => (
              <CatalogProductCard
                key={product.slug}
                product={product}
                typeLabel={typeLabel.get(product.type)}
                ctaLabel={copy.productCta}
              />
            ))}
          </CardGrid>
        )}

        {remaining > 0 && (
          <div className="tablet:pt-9 flex justify-center pt-6">
            <Button
              variant="outline"
              onClick={() => setVisibleCount((n) => n + loadMoreStep)}
              className="tablet:h-[54px] tablet:gap-2.5 tablet:px-8 tablet:text-[15px] h-[50px] gap-2 px-[26px] text-sm"
            >
              {copy.loadMore}
              <span className="text-text-muted font-semibold">
                · {remaining}
              </span>
            </Button>
          </div>
        )}
      </Section>
    </>
  );
}
