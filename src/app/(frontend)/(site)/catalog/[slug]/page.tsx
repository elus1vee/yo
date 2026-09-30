import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/blocks/breadcrumbs";
import { CardGrid } from "@/components/blocks/card-grid";
import { CatalogProductCard } from "@/components/blocks/catalog-product-card";
import { Section } from "@/components/blocks/section";
import { ProductDetailLive } from "@/components/live/product-detail-live";
import { JsonLd } from "@/components/seo/json-ld";
import { typeOptions } from "@/content/catalog";
import { productCopy } from "@/content/product";
import { breadcrumbListJsonLd, copyToText, productJsonLd } from "@/lib/json-ld";
import {
  getProductDetail,
  getProductSlugs,
  getRawProduct,
} from "@/lib/mock-data";
import { richTextToPlainText } from "@/lib/rich-text";
import { pageMetadata } from "@/lib/seo";
import { mediaImage, productToView } from "@/lib/view/product";

export async function generateStaticParams() {
  return (await getProductSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/catalog/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const raw = await getRawProduct(slug);
  if (!raw) return {};
  const product = productToView(raw);
  // Editors can override the auto title/description/image on the SEO tab;
  // fall back to the product's own fields when they leave it empty.
  return pageMetadata({
    title: raw.meta?.title || product.name,
    description: raw.meta?.description || richTextToPlainText(raw.description),
    image: mediaImage(raw.meta?.image)?.src ?? mediaImage(raw.images?.[0])?.src,
    path: `/catalog/${product.slug}`,
    // the product name always carries the brand ("Йо! TOFU ..."), so no
    // "— Йо!" template suffix — same for a custom SEO title
    absolute: true,
  });
}

export default async function ProductPage(props: PageProps<"/catalog/[slug]">) {
  const { slug } = await props.params;
  const [raw, product] = await Promise.all([
    getRawProduct(slug),
    getProductDetail(slug),
  ]);
  if (!raw || !product) notFound();

  const typeLabel = typeOptions.find((t) => t.id === product.type)?.label;
  const path = `/catalog/${product.slug}`;

  const breadcrumbItems = [
    { label: productCopy.breadcrumbs.home, href: "/" },
    { label: productCopy.breadcrumbs.catalog, href: "/catalog" },
    ...(typeLabel
      ? [
          {
            label: typeLabel,
            href: `/catalog?type=${product.type}`,
            hideOnMobile: true,
          },
        ]
      : []),
    { label: product.shortName },
  ];

  return (
    <>
      <JsonLd
        data={productJsonLd({
          name: product.name,
          description: richTextToPlainText(raw.description),
          image: mediaImage(raw.images?.[0])?.src,
          path,
          category: typeLabel,
        })}
      />
      <JsonLd
        data={breadcrumbListJsonLd([
          ...breadcrumbItems
            .slice(0, -1)
            .map((item) => ({ name: copyToText(item.label), path: item.href })),
          { name: product.shortName, path },
        ])}
      />

      <Breadcrumbs
        label={productCopy.breadcrumbs.label}
        items={breadcrumbItems}
      />

      <Section inset="page" rhythm="detail">
        <ProductDetailLive
          initialProduct={raw}
          galleryLabel={productCopy.galleryLabel}
          cta={productCopy.cta}
        />
      </Section>

      {product.related.length > 0 && (
        <Section
          title={productCopy.relatedTitle}
          titleSize="md"
          inset="page"
          rhythm="detail-end"
        >
          <CardGrid layout="catalog">
            {product.related.map((item) => (
              <CatalogProductCard
                key={item.slug}
                product={item}
                typeLabel={typeOptions.find((t) => t.id === item.type)?.label}
                ctaLabel={productCopy.relatedCta}
              />
            ))}
          </CardGrid>
        </Section>
      )}
    </>
  );
}
