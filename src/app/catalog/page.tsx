import { CatalogBrowser } from "@/components/blocks/catalog-browser";
import { Footer } from "@/components/blocks/footer";
import { Header } from "@/components/blocks/header";
import { PageIntro } from "@/components/blocks/page-intro";
import {
  animalOptions,
  catalogCopy,
  catalogIntro,
  typeOptions,
} from "@/content/catalog";
import { footer, header } from "@/content/site";
import { catalogProducts } from "@/lib/mock-data";

const firstValue = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export default async function CatalogPage(props: PageProps<"/catalog">) {
  // `/catalog?animal=rodents` opens the catalog with that filter applied.
  const { animal, type } = await props.searchParams;

  return (
    <>
      <Header {...header} />
      <main>
        <PageIntro {...catalogIntro} />
        <CatalogBrowser
          products={catalogProducts}
          animals={animalOptions}
          types={typeOptions}
          copy={catalogCopy}
          initialAnimal={firstValue(animal)}
          initialType={firstValue(type)}
        />
      </main>
      <Footer {...footer} />
    </>
  );
}
