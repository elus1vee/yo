"use client";

import { useLivePreview } from "@payloadcms/live-preview-react";
import { CardGrid } from "@/components/blocks/card-grid";
import { FeatureTile } from "@/components/blocks/feature-tile";
import { PageIntro } from "@/components/blocks/page-intro";
import {
  PartnerTile,
  type PartnerTileProps,
} from "@/components/blocks/partner-tile";
import { PhotoCard } from "@/components/blocks/photo-card";
import { Section } from "@/components/blocks/section";
import { WHERE_TO_BUY_ID } from "@/content/site";
import { aboutToView } from "@/lib/view/about";
import type { DeepPartial } from "@/lib/utils";
import type { About } from "@/payload-types";

interface AboutPageLiveProps {
  initialAbout: DeepPartial<About>;
  /** Not part of the About global (it's Partners'), so not live-updated. */
  partners: PartnerTileProps[];
}

/** Whole About page body — see ProductDetailLive for how/why. */
export function AboutPageLive({ initialAbout, partners }: AboutPageLiveProps) {
  const { data } = useLivePreview<DeepPartial<About>>({
    initialData: initialAbout,
    serverURL: typeof window !== "undefined" ? window.location.origin : "",
    depth: 0,
  });
  const { intro, production, certificates, whereToBuy } = aboutToView(data);

  return (
    <>
      <PageIntro {...intro} />

      {production.items.length > 0 && (
        <Section
          title={production.title}
          titleSize="md"
          inset="page"
          rhythm="stack"
        >
          <CardGrid layout="triple">
            {production.items.map((item, i) => (
              <PhotoCard key={i} {...item} />
            ))}
          </CardGrid>
        </Section>
      )}

      {certificates.items.length > 0 && (
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
      )}

      {partners.length > 0 && (
        <Section
          id={WHERE_TO_BUY_ID}
          title={whereToBuy.title}
          titleSize="md"
          aside={whereToBuy.aside}
          inset="page"
          rhythm="stack-end"
        >
          <CardGrid layout="partners">
            {partners.map((item) => (
              <PartnerTile key={item.name} {...item} />
            ))}
          </CardGrid>
        </Section>
      )}
    </>
  );
}
