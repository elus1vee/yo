import type { Metadata } from "next";
import { CatalogBrowser } from "@/components/blocks/catalog-browser";
import { PageIntro } from "@/components/blocks/page-intro";
import {
  animalOptions,
  catalogCopy,
  catalogIntro,
  typeOptions,
} from "@/content/catalog";
import { catalogSeo } from "@/content/seo";
import { getCatalogProducts } from "@/lib/mock-data";
import { pageMetadata } from "@/lib/seo";

// Filters live in the query string; the canonical URL is the unfiltered list.
export const metadata: Metadata = pageMetadata(catalogSeo);

const firstValue = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export default async function CatalogPage(props: PageProps<"/catalog">) {
  // `/catalog?animal=rodents` opens the catalog with that filter applied.
  const [{ animal, type }, catalogProducts] = await Promise.all([
    props.searchParams,
    getCatalogProducts(),
  ]);

  return (
    <>
      <PageIntro {...catalogIntro} />
      <CatalogBrowser
        products={catalogProducts}
        animals={animalOptions}
        types={typeOptions}
        copy={catalogCopy}
        initialAnimal={firstValue(animal)}
        initialType={firstValue(type)}
      />
    </>
  );
}
