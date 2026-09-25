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
import {
  animals,
  audiences,
  categories,
  hero,
  newsSection,
  phPromo,
  productsSection,
} from "@/content/home";
import { contactForm } from "@/content/site";
import { news, products } from "@/lib/mock-data";

export default function Home() {
  return (
    <>
      <Hero {...hero} />

      <Section title={animals.title} aside={animals.aside}>
        <CardGrid layout="triple">
          {animals.items.map((animal) => (
            <AnimalCard key={animal.href} {...animal} />
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

      <Section>
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
        <ContactForm copy={contactForm.copy} contacts={contactForm.contacts} />
      </Section>
    </>
  );
}
