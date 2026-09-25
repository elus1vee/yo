import type { Metadata } from "next";
import { Header } from "@/components/blocks/header";
import { StatusPage } from "@/components/blocks/status-page";
import { notFoundCopy } from "@/content/legal";
import { header } from "@/content/site";

export const metadata: Metadata = { title: "Страница не найдена" };

/**
 * Handles notFound() and every unmatched URL. It sits outside the (site)
 * group, so it renders its own header — without the messenger buttons and
 * without a footer, as in the mockup.
 */
export default function NotFound() {
  return (
    <>
      <Header {...header} messengers={[]} />
      <StatusPage {...notFoundCopy} />
    </>
  );
}
