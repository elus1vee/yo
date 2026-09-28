"use client";

import { useState } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";
import { RichText, type RichTextProps } from "@/components/ui/rich-text";
import { type FilterOption, FilterGroup } from "./filter-group";
import { type LinkAction } from "./types";

/** A choice the buyer makes on the product page, e.g. volume or scent. */
export interface OptionGroup {
  id: string;
  label: string;
  options: FilterOption[];
  /** Preselected option; defaults to the first one. */
  defaultId?: string;
}

/** A row of the spec card: a fixed value, or the selected option of a group. */
export interface SpecItem {
  label: string;
  value?: string;
  /** Id of an OptionGroup: shows the currently selected option's label. */
  fromGroup?: string;
}

export interface ProductInfoProps {
  /** Small caps line above the title, e.g. "Наполнители · для кошек". */
  eyebrow: string;
  title: string;
  description?: RichTextProps["data"];
  groups?: OptionGroup[];
  specs?: SpecItem[];
  cta: LinkAction;
}

/**
 * Right column of the product page. Option groups are single-select and
 * always keep a value; the spec card reflects the current selection.
 */
export function ProductInfo({
  eyebrow,
  title,
  description,
  groups = [],
  specs = [],
  cta,
}: ProductInfoProps) {
  const [selected, setSelected] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      groups.map((g) => [g.id, g.defaultId ?? g.options[0]?.id ?? ""]),
    ),
  );

  const specValue = (spec: SpecItem) => {
    if (!spec.fromGroup) return spec.value;
    const group = groups.find((g) => g.id === spec.fromGroup);
    return group?.options.find((o) => o.id === selected[group.id])?.label;
  };
  const shownSpecs = specs.filter((spec) => specValue(spec));

  return (
    <div className="tablet:gap-6 flex flex-col gap-5">
      <div className="tablet:gap-3 flex flex-col gap-2.5">
        <p className="text-text-muted tablet:text-xs tablet:tracking-[0.12em] text-[11px] font-bold tracking-[0.1em] uppercase">
          {eyebrow}
        </p>
        <h1 className="font-heading text-h1 [overflow-wrap:anywhere]">
          {title}
        </h1>
        {description && (
          <RichText data={description} className="tablet:leading-[1.65]" />
        )}
      </div>

      {groups
        .filter((group) => group.options.length > 1)
        .map((group) => (
          <FilterGroup
            key={group.id}
            label={group.label}
            options={group.options}
            value={selected[group.id] ?? null}
            allowClear={false}
            onChange={(id) =>
              id && setSelected((prev) => ({ ...prev, [group.id]: id }))
            }
          />
        ))}

      <ButtonLink
        href={cta.href}
        variant="primary"
        size="lg"
        className="tablet:h-[58px] h-[54px] w-full"
      >
        {cta.label}
      </ButtonLink>

      {shownSpecs.length > 0 && (
        <Card className="tablet:rounded-md tablet:p-6 rounded-card-sm p-4.5">
          <dl className="tablet:grid-cols-3 tablet:gap-5 grid grid-cols-2 gap-4">
            {shownSpecs.map((spec, i) => (
              <div
                key={spec.label}
                // odd last item takes the full row on the 2-column mobile grid
                className={
                  i === shownSpecs.length - 1 && shownSpecs.length % 2 === 1
                    ? "tablet:col-span-1 col-span-2 flex flex-col gap-1.5"
                    : "flex flex-col gap-1.5"
                }
              >
                <dt className="text-text-muted tablet:text-[11px] text-[10px] tracking-[0.1em] uppercase">
                  {spec.label}
                </dt>
                <dd className="font-heading tablet:text-lg text-base">
                  {specValue(spec)}
                </dd>
              </div>
            ))}
          </dl>
        </Card>
      )}
    </div>
  );
}
