import type { Metadata } from "next";
import { Header } from "@/components/blocks/header";
import { StatusPage } from "@/components/blocks/status-page";
import { notFoundCopy } from "@/content/legal";
import { getHeaderContent } from "@/lib/cms-content";

export const metadata: Metadata = { title: "Страница не найдена" };

/**
 * Handles notFound() and every unmatched URL. It sits outside the (site)
 * group, so it renders its own header — without the messenger buttons and
 * without a footer, as in the mockup.
 */
export default async function NotFound() {
  const header = await getHeaderContent();
  return (
    <>
      <Header {...header} messengers={[]} />
      <StatusPage {...notFoundCopy} />
    </>
  );
}
