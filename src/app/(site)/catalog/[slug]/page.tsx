import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/blocks/breadcrumbs";
import { CardGrid } from "@/components/blocks/card-grid";
import { CatalogProductCard } from "@/components/blocks/catalog-product-card";
import { ProductGallery } from "@/components/blocks/product-gallery";
import { ProductInfo } from "@/components/blocks/product-info";
import { Section } from "@/components/blocks/section";
import { typeOptions } from "@/content/catalog";
import { productCopy } from "@/content/product";
import {
  getProductDetail,
  getProductSlugs,
  getRelatedProducts,
} from "@/lib/mock-data";

export function generateStaticParams() {
  return getProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/catalog/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProductDetail(slug);
  return product ? { title: product.name } : {};
}

export default async function ProductPage(props: PageProps<"/catalog/[slug]">) {
  const { slug } = await props.params;
  const product = getProductDetail(slug);
  if (!product) notFound();

  const typeLabel = typeOptions.find((t) => t.id === product.type)?.label;
  const related = getRelatedProducts(product);

  return (
    <>
      <Breadcrumbs
        label={productCopy.breadcrumbs.label}
        items={[
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
        ]}
      />

      <Section inset="page" rhythm="detail">
        <CardGrid layout="split">
          <ProductGallery
            images={product.gallery}
            label={productCopy.galleryLabel}
          />
          <ProductInfo
            eyebrow={[typeLabel, product.audience].filter(Boolean).join(" · ")}
            title={product.name}
            description={product.description}
            groups={product.groups}
            specs={product.specs}
            cta={productCopy.cta}
          />
        </CardGrid>
      </Section>

      {related.length > 0 && (
        <Section
          title={productCopy.relatedTitle}
          titleSize="md"
          inset="page"
          rhythm="detail-end"
        >
          <CardGrid layout="catalog">
            {related.map((item) => (
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
