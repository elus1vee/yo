"use client";

import { useLivePreview } from "@payloadcms/live-preview-react";
import { CardGrid } from "@/components/blocks/card-grid";
import { type LinkAction } from "@/components/blocks/types";
import { ProductGallery } from "@/components/blocks/product-gallery";
import { ProductInfo } from "@/components/blocks/product-info";
import { typeOptions } from "@/content/catalog";
import { productToView } from "@/lib/view/product";
import type { Product } from "@/payload-types";

interface ProductDetailLiveProps {
  initialProduct: Product;
  galleryLabel: string;
  cta: LinkAction;
}

/**
 * Gallery + info column of the product page. Recomputes the view props from
 * `useLivePreview`'s data on every edit in the admin — a no-op outside the
 * Payload admin iframe, where `data` just stays `initialProduct`.
 */
export function ProductDetailLive({
  initialProduct,
  galleryLabel,
  cta,
}: ProductDetailLiveProps) {
  const { data } = useLivePreview<Product>({
    initialData: initialProduct,
    serverURL: typeof window !== "undefined" ? window.location.origin : "",
    depth: 2,
  });
  const product = productToView(data);
  const typeLabel = typeOptions.find((t) => t.id === data.categoryType)?.label;

  return (
    <CardGrid layout="split">
      <ProductGallery images={product.gallery} label={galleryLabel} />
      <ProductInfo
        eyebrow={[typeLabel, product.audience].filter(Boolean).join(" · ")}
        title={product.name}
        description={product.description}
        groups={product.groups}
        specs={product.specs}
        cta={cta}
      />
    </CardGrid>
  );
}
