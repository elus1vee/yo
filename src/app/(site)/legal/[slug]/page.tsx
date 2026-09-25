import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/blocks/breadcrumbs";
import { LegalDocument } from "@/components/blocks/legal-document";
import { legalCopy } from "@/content/legal";
import { getLegalPage, getLegalSlugs } from "@/lib/mock-data";

export function generateStaticParams() {
  return getLegalSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/legal/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const page = getLegalPage(slug);
  return page ? { title: page.title } : {};
}

export default async function LegalPage(props: PageProps<"/legal/[slug]">) {
  const { slug } = await props.params;
  const page = getLegalPage(slug);
  if (!page) notFound();

  return (
    <>
      <Breadcrumbs
        label={legalCopy.breadcrumbs.label}
        items={[
          { label: legalCopy.breadcrumbs.home, href: "/" },
          // the mockup shortens the last crumb to "Политика" on mobile
          { label: { desktop: page.title, mobile: page.title.split(" ")[0] } },
        ]}
      />
      <LegalDocument
        title={page.title}
        updated={page.updated}
        tocLabel={legalCopy.tocLabel}
        sections={page.sections}
      />
    </>
  );
}
