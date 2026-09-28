import type { Metadata } from "next";
import { AboutPageLive } from "@/components/live/about-page-live";
import { aboutSeo } from "@/content/seo";
import { getAboutRaw, getPartnersContent } from "@/lib/cms-content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(aboutSeo);

export default async function AboutPage() {
  const [about, partners] = await Promise.all([
    getAboutRaw(),
    getPartnersContent(),
  ]);

  return <AboutPageLive initialAbout={about} partners={partners} />;
}
