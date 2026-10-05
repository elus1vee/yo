import type { Metadata } from "next";
import { connection } from "next/server";
import { Header } from "@/components/blocks/header";
import { StatusPage } from "@/components/blocks/status-page";
import { notFoundCopy } from "@/content/legal";
import { getHeaderContent } from "@/lib/cms-content";
import { lora, manrope } from "./fonts";
import "@/styles/globals.css";

export const metadata: Metadata = { title: "Страница не найдена" };

/**
 * 404 for URLs that match no route at all. The app has two root layouts
 * (site and Payload admin), so there is no single layout to compose it from
 * — it renders its own <html>. Same content as (frontend)/not-found.tsx.
 */
export default async function GlobalNotFound() {
  // Reads the CMS: render per request, not while the image builds.
  await connection();
  const header = await getHeaderContent();
  return (
    <html
      lang="ru"
      className={`${lora.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="font-body flex min-h-full flex-col">
        <Header {...header} messengers={[]} />
        <StatusPage {...notFoundCopy} />
      </body>
    </html>
  );
}
