import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/blocks/breadcrumbs";
import { CardGrid } from "@/components/blocks/card-grid";
import { NewsCard } from "@/components/blocks/news-card";
import { Section } from "@/components/blocks/section";
import { NewsArticleLive } from "@/components/live/news-article-live";
import { articleCopy, shareLinks } from "@/content/news";
import {
  getNewsArticle,
  getNewsSlugs,
  getRawNewsArticle,
} from "@/lib/mock-data";
import { pageMetadata } from "@/lib/seo";
import { newsToView } from "@/lib/view/news";
import { mediaImage } from "@/lib/view/product";

export async function generateStaticParams() {
  return (await getNewsSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/news/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const raw = await getRawNewsArticle(slug);
  if (!raw) return {};
  const article = newsToView(raw);
  // Editors can override the auto title/description/image on the SEO tab;
  // fall back to the article's own fields when they leave it empty.
  return pageMetadata({
    title: raw.meta?.title || article.title,
    description: raw.meta?.description || article.excerpt,
    image: mediaImage(raw.meta?.image)?.src ?? mediaImage(raw.cover)?.src,
    path: `/news/${article.slug}`,
    // an editor-written SEO title already has its own wording; avoid piling
    // the " — Йо!" template suffix on top of it
    absolute: Boolean(raw.meta?.title),
    type: "article",
    publishedTime: article.dateTime,
  });
}

export default async function NewsArticlePage(
  props: PageProps<"/news/[slug]">,
) {
  const { slug } = await props.params;
  const [raw, article] = await Promise.all([
    getRawNewsArticle(slug),
    getNewsArticle(slug),
  ]);
  if (!raw || !article) notFound();

  return (
    <>
      <Breadcrumbs
        label={articleCopy.breadcrumbs.label}
        items={[
          { label: articleCopy.breadcrumbs.home, href: "/" },
          { label: articleCopy.breadcrumbs.news, href: "/news" },
          { label: articleCopy.breadcrumbs.article },
        ]}
      />

      <NewsArticleLive
        initialArticle={raw}
        share={shareLinks}
        labels={articleCopy.labels}
      />

      {article.related.length > 0 && (
        <Section
          title={articleCopy.relatedTitle}
          titleSize="md"
          inset="page"
          rhythm="detail-end"
        >
          <CardGrid layout="news">
            {article.related.map((item) => (
              <NewsCard key={item.href} variant="compact" {...item} />
            ))}
          </CardGrid>
        </Section>
      )}
    </>
  );
}
