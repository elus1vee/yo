import type { Metadata } from "next";
import { CardGrid } from "@/components/blocks/card-grid";
import { FeatureTile } from "@/components/blocks/feature-tile";
import { PageIntro } from "@/components/blocks/page-intro";
import { PartnerTile } from "@/components/blocks/partner-tile";
import { PhotoCard } from "@/components/blocks/photo-card";
import { Section } from "@/components/blocks/section";
import {
  WHERE_TO_BUY_ID,
  aboutIntro,
  certificates,
  production,
  whereToBuy,
} from "@/content/about";
import { aboutSeo } from "@/content/seo";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(aboutSeo);

export default function AboutPage() {
  return (
    <>
      <PageIntro {...aboutIntro} />

      <Section
        title={production.title}
        titleSize="md"
        inset="page"
        rhythm="stack"
      >
        <CardGrid layout="triple">
          {production.items.map((item) => (
            <PhotoCard key={item.tint} {...item} />
          ))}
        </CardGrid>
      </Section>

      <Section
        title={certificates.title}
        titleSize="md"
        inset="page"
        rhythm="stack"
      >
        <CardGrid layout="tiles">
          {certificates.items.map((item) => (
            <FeatureTile key={item.title} {...item} />
          ))}
        </CardGrid>
      </Section>

      <Section
        id={WHERE_TO_BUY_ID}
        title={whereToBuy.title}
        titleSize="md"
        aside={whereToBuy.aside}
        inset="page"
        rhythm="stack-end"
      >
        <CardGrid layout="partners">
          {whereToBuy.items.map((item) => (
            <PartnerTile key={item.name} {...item} />
          ))}
        </CardGrid>
      </Section>
    </>
  );
}
