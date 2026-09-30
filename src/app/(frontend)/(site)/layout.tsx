import { Footer } from "@/components/blocks/footer";
import { Header } from "@/components/blocks/header";
import { JsonLd } from "@/components/seo/json-ld";
import {
  getFooterContent,
  getHeaderContent,
  getOrganizationJsonLd,
} from "@/lib/cms-content";
import { websiteJsonLd } from "@/lib/json-ld";

/**
 * Shared frame of the public site: sticky header, growing <main>, footer.
 * `flex-1` on <main> is what keeps the footer at the bottom of the window
 * on short pages. Dev/preview routes (/ui-kit, /design-system, /blocks)
 * live outside this group and render without it.
 */
export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [header, footer, organizationSchema] = await Promise.all([
    getHeaderContent(),
    getFooterContent(),
    getOrganizationJsonLd(),
  ]);
  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteJsonLd()} />
      <Header {...header} />
      <main className="flex-1">{children}</main>
      <Footer {...footer} />
    </>
  );
}
