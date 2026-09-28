import type { Metadata } from "next";
import { type ReactNode } from "react";
import { Footer } from "@/components/blocks/footer";
import { Header } from "@/components/blocks/header";
import { NewsCard } from "@/components/blocks/news-card";
import { ProductCard } from "@/components/blocks/product-card";
import { homeContactFormCopy } from "@/content/site";
import {
  getContactFacts,
  getFooterContent,
  getHeaderContent,
} from "@/lib/cms-content";
import { getFeaturedProducts, getLatestNews } from "@/lib/mock-data";
import { ContactFormDemo } from "./contact-form-demo";

// Internal preview page: keep it out of search results.
export const metadata: Metadata = {
  title: "blocks",
  robots: { index: false, follow: false },
};

/**
 * Preview of the composite blocks with real Payload content (whatever is
 * currently published in Products / News). Resize the window (or open at
 * 390px) to see the mobile layouts. The last section feeds hostile strings
 * through the blocks.
 */

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="tablet:gap-7 flex flex-col gap-5">
      <h2 className="font-heading text-h1 px-2">{title}</h2>
      {children}
    </section>
  );
}

const XSS = '<img src=x onerror="alert(1)">';

export default async function BlocksPreview() {
  const [header, footer, products, news, contacts] = await Promise.all([
    getHeaderContent(),
    getFooterContent(),
    getFeaturedProducts(),
    getLatestNews(),
    getContactFacts(),
  ]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header {...header} />

      <main className="tablet:px-10 tablet:py-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-14 px-3.5 py-6">
        <Section title="Любимое у покупателей">
          <div className="tablet:grid-cols-2 tablet:gap-5 split:grid-cols-4 grid gap-3">
            {products.map((p) => (
              <ProductCard key={p.href} {...p} />
            ))}
          </div>
        </Section>

        <Section title="Что нового">
          <div className="tablet:grid-cols-2 tablet:gap-5 split:grid-cols-3 grid gap-3">
            {news.map((n) => (
              <NewsCard key={n.href} {...n} />
            ))}
          </div>
        </Section>

        <ContactFormDemo copy={homeContactFormCopy} contacts={contacts} />

        <Section title="XSS-проверка">
          <p className="text-body text-text-muted max-w-[760px] px-2">
            Ниже в карточки подставлены HTML-строка и ссылка{" "}
            <code>javascript:alert(1)</code>. Текст должен отобразиться
            буквально, а ссылка — превратиться в «#» (проверьте href).
          </p>
          <div className="tablet:grid-cols-2 tablet:gap-5 split:grid-cols-3 grid gap-3">
            <ProductCard
              name={XSS}
              href="javascript:alert(1)"
              volume={XSS}
              kind={XSS}
              badge={XSS}
              tags={[{ label: XSS, tone: "peach", strong: true }]}
              ctaLabel={XSS}
            />
            <NewsCard
              title={XSS}
              href="  JaVa&#09;Script:alert(1)"
              date={XSS}
              category={XSS}
              excerpt={XSS}
              readMoreLabel={XSS}
            />
          </div>
        </Section>
      </main>

      <Footer {...footer} />
    </div>
  );
}
