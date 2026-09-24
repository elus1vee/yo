import { type BadgeTone } from "@/components/ui/badge";
import { ProductCard } from "./product-card";
import { type CardImage, type CardTint } from "./types";

export interface CatalogProduct {
  slug: string;
  name: string;
  /** Product page. */
  href: string;
  /** Ids from the "animals" filter options; a product can fit several. */
  animals: string[];
  /** Id from the "types" filter options. */
  type: string;
  volume: string;
  tint: CardTint;
  tagTone: BadgeTone;
  tagStrong?: boolean;
  image?: CardImage;
  imageCaption?: string;
}

export interface CatalogProductCardProps {
  product: CatalogProduct;
  /** Human-readable product type shown above the title. */
  typeLabel?: string;
  ctaLabel: string;
}

/** Catalog-listing card for a product; used by the catalog and "similar products". */
export function CatalogProductCard({
  product,
  typeLabel,
  ctaLabel,
}: CatalogProductCardProps) {
  return (
    <ProductCard
      variant="catalog"
      name={product.name}
      href={product.href}
      eyebrow={typeLabel}
      tint={product.tint}
      image={product.image}
      imageCaption={product.imageCaption}
      tags={[
        {
          label: product.volume,
          tone: product.tagTone,
          strong: product.tagStrong,
        },
      ]}
      ctaLabel={ctaLabel}
    />
  );
}
