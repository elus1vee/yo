import type { FeatureTileProps } from "@/components/blocks/feature-tile";
import type { PageIntroProps } from "@/components/blocks/page-intro";
import type { PhotoCardProps } from "@/components/blocks/photo-card";
import type { About, Media } from "@/payload-types";

function imageOf(
  value: number | Media | null | undefined,
): PhotoCardProps["image"] {
  if (typeof value !== "object" || value === null || !value.url)
    return undefined;
  return { src: value.url, alt: value.alt };
}

/**
 * Pure Payload-doc → view-prop mapper for the About global — no fetching, so
 * it runs both on the server (cms-content.ts) and in the browser
 * (AboutPageLive, via useLivePreview). Kept out of cms-content.ts, which
 * imports the (Node-only) Payload Local API and can't be bundled for the
 * client.
 */

export interface AboutContent {
  intro: PageIntroProps;
  production: { title: string; items: PhotoCardProps[] };
  certificates: { title: string; items: FeatureTileProps[] };
  whereToBuy: { title: string; aside: string };
}

export function aboutToView(about: About): AboutContent {
  return {
    intro: {
      eyebrow: about.intro.eyebrow ?? undefined,
      title: about.intro.title,
      description: about.intro.description,
    },
    production: {
      title: about.production.title,
      items: (about.production.items ?? []).map((i) => ({
        tint: i.tint,
        text: i.text,
        image: imageOf(i.image),
      })),
    },
    certificates: {
      title: about.certificates.title,
      items: (about.certificates.items ?? []).map((i) => ({
        title: i.title,
        description: i.description,
        tint: i.tint,
      })),
    },
    whereToBuy: {
      title: about.whereToBuy.title,
      aside: about.whereToBuy.aside,
    },
  };
}
