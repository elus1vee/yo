import type { CatalogProduct } from "@/components/blocks/catalog-product-card";
import type { GalleryImage } from "@/components/blocks/product-gallery";
import type { OptionGroup, SpecItem } from "@/components/blocks/product-info";
import type { ProductCardProps } from "@/components/blocks/product-card";
import { animalOptions } from "@/content/catalog";
import type { Media, Product } from "@/payload-types";

/**
 * Pure Payload-doc → view-prop mappers for products: no fetching, so they
 * run both on the server (mock-data.ts) and in the browser (the Live
 * Preview components, which re-run them on every edit via useLivePreview).
 */

const animalLabel = new Map(animalOptions.map((a) => [a.id, a.label]));
const genitive: Record<string, string> = {
  cats: "кошек",
  dogs: "собак",
  rodents: "грызунов",
};

export function audienceOf(animals: string[]) {
  if (animals.length >= 3) return "для всех питомцев";
  return `для ${animals.map((a) => genitive[a] ?? a).join(" и ")}`;
}

export const mediaImage = (media: Media | number | null | undefined) =>
  media && typeof media === "object" && media.url
    ? { src: media.url, alt: media.alt }
    : undefined;

/** Distinct, non-empty values of a variant field, in first-seen order. */
export function variantValues(
  variants: Product["variants"],
  field: "volume" | "scent",
) {
  const seen = new Set<string>();
  for (const v of variants ?? []) {
    const value = v[field]?.trim();
    if (value) seen.add(value);
  }
  return [...seen];
}

/** Product card for the "Любимое у покупателей" grid (home page). */
export function productCardOf(product: Product): ProductCardProps {
  const scents = variantValues(product.variants, "scent");
  const volumes = variantValues(product.variants, "volume");
  const tagValues = scents.length > 1 ? scents : volumes;

  return {
    name: product.title,
    href: `/catalog/${product.slug}`,
    volume: product.specs?.volume ?? volumes[0],
    kind: product.subtitle ?? undefined,
    tint: product.tint,
    image: mediaImage(product.images?.[0]),
    badge: product.badge ?? undefined,
    tags: tagValues.map((label, i) => ({
      label,
      tone: product.tint,
      strong: i === 0,
    })),
    ctaLabel: "Подробнее",
  };
}

/** Catalog-listing shape (catalog page, product page's "related" grid). */
export function catalogProductOf(product: Product): CatalogProduct {
  const image = mediaImage(product.images?.[0]);
  return {
    slug: product.slug,
    name: product.title,
    href: `/catalog/${product.slug}`,
    animals: product.categoryAnimal,
    type: product.categoryType,
    volume:
      product.specs?.volume ??
      variantValues(product.variants, "volume")[0] ??
      "",
    tint: product.tint,
    tagTone: product.tint,
    tagStrong: true,
    image,
    imageCaption: image ? undefined : "упаковка",
  };
}

export function galleryOf(product: Product): GalleryImage[] {
  const images = (product.images ?? []).filter(
    (img): img is Media => typeof img === "object" && Boolean(img.url),
  );
  if (images.length === 0) {
    return [
      {
        id: "placeholder",
        alt: product.title,
        tint: product.tint,
        caption: "фото скоро появится",
      },
    ];
  }
  return images.map((img) => ({
    id: String(img.id),
    alt: img.alt,
    src: img.url ?? undefined,
    tint: product.tint,
  }));
}

export function groupsOf(product: Product): OptionGroup[] {
  const groups: OptionGroup[] = [];
  const volumes = variantValues(product.variants, "volume");
  const scents = variantValues(product.variants, "scent");
  if (volumes.length > 1)
    groups.push({
      id: "volume",
      label: "Объём",
      options: volumes.map((v) => ({ id: v, label: v })),
    });
  if (scents.length > 1)
    groups.push({
      id: "scent",
      label: "Аромат",
      options: scents.map((s) => ({ id: s, label: s })),
    });
  return groups;
}

export function specsOf(product: Product, groups: OptionGroup[]): SpecItem[] {
  const hasVolumeGroup = groups.some((g) => g.id === "volume");
  const hasScentGroup = groups.some((g) => g.id === "scent");
  const specs: SpecItem[] = [];

  if (hasVolumeGroup) specs.push({ label: "Объём", fromGroup: "volume" });
  else if (product.specs?.volume)
    specs.push({ label: "Объём", value: product.specs.volume });

  if (product.specs?.weight)
    specs.push({ label: "Вес", value: product.specs.weight });

  if (hasScentGroup) specs.push({ label: "Аромат", fromGroup: "scent" });
  else {
    const scent = variantValues(product.variants, "scent")[0];
    if (scent) specs.push({ label: "Аромат", value: scent });
  }

  specs.push({
    label: "Для кого",
    value: product.categoryAnimal
      .map((a) => animalLabel.get(a) ?? a)
      .join(", "),
  });
  return specs;
}

export interface ProductDetailView {
  slug: string;
  name: string;
  shortName: string;
  type: string;
  audience: string;
  /** Raw richText (Lexical JSON) — rendered with formatting by <RichText>. */
  description?: Product["description"];
  gallery: GalleryImage[];
  groups: OptionGroup[];
  specs: SpecItem[];
}

/** Everything about a product's own fields — not `related` (a separate query). */
export function productToView(product: Product): ProductDetailView {
  const groups = groupsOf(product);
  return {
    slug: product.slug,
    name: product.title,
    shortName: product.title,
    type: product.categoryType,
    audience: audienceOf(product.categoryAnimal),
    description: product.description,
    gallery: galleryOf(product),
    groups,
    specs: specsOf(product, groups),
  };
}
