import type { Metadata } from "next";
import { AnimalCard } from "@/components/blocks/animal-card";
import { AudiencePanel } from "@/components/blocks/audience-panel";
import { CardGrid } from "@/components/blocks/card-grid";
import { CategoryLink } from "@/components/blocks/category-link";
import { ContactForm } from "@/components/blocks/contact-form";
import { Hero } from "@/components/blocks/hero";
import { NewsCard } from "@/components/blocks/news-card";
import { PhPromo } from "@/components/blocks/ph-promo";
import { ProductCard } from "@/components/blocks/product-card";
import { Section } from "@/components/blocks/section";
import type { CardImage } from "@/components/blocks/types";
import {
  animals,
  audiences,
  audiencesTitle,
  categories,
  hero,
  newsSection,
  phPromo,
  productsSection,
} from "@/content/home";
import { homeSeo } from "@/content/seo";
import { homeContactFormCopy } from "@/content/site";
import { getContactFacts, getHomeMedia } from "@/lib/cms-content";
import { getFeaturedProducts, getLatestNews } from "@/lib/mock-data";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ ...homeSeo, absolute: true });

export default async function Home() {
  const [products, news, contactFacts, homeMedia] = await Promise.all([
    getFeaturedProducts(),
    getLatestNews(),
    getContactFacts(),
    getHomeMedia(),
  ]);

  // `animals.items[].href` (see src/content/home.ts) → the matching Home global field.
  const animalImageByHref: Record<string, CardImage | undefined> = {
    "/catalog?animal=cats": homeMedia.animals.cats,
    "/catalog?animal=dogs": homeMedia.animals.dogs,
    "/catalog?animal=rodents": homeMedia.animals.rodents,
  };

  return (
    <>
      <Hero {...hero} media={homeMedia.hero ?? hero.media} />

      <Section title={animals.title} aside={animals.aside}>
        <CardGrid layout="triple">
          {animals.items.map((animal) => (
            <AnimalCard
              key={animal.href}
              {...animal}
              image={animalImageByHref[animal.href] ?? animal.image}
            />
          ))}
        </CardGrid>
        <CardGrid layout="pills">
          {categories.map((category) => (
            <CategoryLink key={category.href} {...category} />
          ))}
        </CardGrid>
      </Section>

      <Section title={productsSection.title} action={productsSection.action}>
        <CardGrid layout="products">
          {products.map((product) => (
            <ProductCard key={product.href} {...product} />
          ))}
        </CardGrid>
      </Section>

      <PhPromo {...phPromo} />

      <Section srTitle={audiencesTitle}>
        <CardGrid layout="pair">
          {audiences.map((audience) => (
            <AudiencePanel key={audience.eyebrow} {...audience} />
          ))}
        </CardGrid>
      </Section>

      <Section title={newsSection.title} action={newsSection.action}>
        <CardGrid layout="triple">
          {news.map((item) => (
            <NewsCard key={item.href} {...item} />
          ))}
        </CardGrid>
      </Section>

      <Section id="contact">
        <ContactForm copy={homeContactFormCopy} contacts={contactFacts} />
      </Section>
    </>
  );
}
