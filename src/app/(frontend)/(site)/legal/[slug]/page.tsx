import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/blocks/breadcrumbs";
import { LegalDocument } from "@/components/blocks/legal-document";
import { JsonLd } from "@/components/seo/json-ld";
import { legalCopy } from "@/content/legal";
import { breadcrumbListJsonLd, copyToText } from "@/lib/json-ld";
import { getLegalPage, getLegalSlugs } from "@/lib/mock-data";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getLegalSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/legal/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const page = getLegalPage(slug);
  if (!page) return {};
  return pageMetadata({
    title: page.title,
    description: page.updated,
    path: `/legal/${page.slug}`,
  });
}

export default async function LegalPage(props: PageProps<"/legal/[slug]">) {
  const { slug } = await props.params;
  const page = getLegalPage(slug);
  if (!page) notFound();

  const path = `/legal/${page.slug}`;

  return (
    <>
      <JsonLd
        data={breadcrumbListJsonLd([
          { name: copyToText(legalCopy.breadcrumbs.home), path: "/" },
          { name: page.title, path },
        ])}
      />

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
