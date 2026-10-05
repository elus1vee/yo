import type { Metadata } from "next";
import { lora, manrope } from "@/app/fonts";
import { homeSeo } from "@/content/seo";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import "@/styles/globals.css";

// Pages read the CMS database, which isn't reachable while the Docker image
// builds (and a deploy shouldn't be needed to show an admin edit), so every
// public page renders per request instead of being pre-rendered.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: homeSeo.title, template: `%s — ${SITE_NAME}` },
  description: homeSeo.description,
  applicationName: SITE_NAME,
  openGraph: { type: "website", siteName: SITE_NAME, locale: "ru_BY" },
  twitter: { card: "summary" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${lora.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="font-body flex min-h-full flex-col">{children}</body>
    </html>
  );
}
