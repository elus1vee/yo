import type { FeatureTileProps } from "@/components/blocks/feature-tile";
import type { PageIntroProps } from "@/components/blocks/page-intro";
import type { PhotoCardProps } from "@/components/blocks/photo-card";
import { aboutSeo } from "@/content/seo";
import type { DeepPartial } from "@/lib/utils";
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
  production: { title?: string; items: PhotoCardProps[] };
  certificates: { title?: string; items: FeatureTileProps[] };
  whereToBuy: { title?: string; aside?: string };
}

export function aboutToView(about: DeepPartial<About>): AboutContent {
  return {
    intro: {
      eyebrow: about.intro?.eyebrow ?? undefined,
      title: about.intro?.title || aboutSeo.title,
      description: about.intro?.description,
    },
    production: {
      title: about.production?.title,
      items: (about.production?.items ?? []).flatMap((i) =>
        i?.text
          ? [
              {
                tint: i.tint ?? "primary",
                text: i.text,
                image: imageOf(i.image as Media | number | null | undefined),
              },
            ]
          : [],
      ),
    },
    certificates: {
      title: about.certificates?.title,
      items: (about.certificates?.items ?? []).flatMap((i) =>
        i?.title && i?.description
          ? [
              {
                title: i.title,
                description: i.description,
                tint: i.tint ?? "primary",
              },
            ]
          : [],
      ),
    },
    whereToBuy: {
      title: about.whereToBuy?.title,
      aside: about.whereToBuy?.aside,
    },
  };
}
