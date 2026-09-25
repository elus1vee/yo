import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/blocks/breadcrumbs";
import { CardGrid } from "@/components/blocks/card-grid";
import { NewsArticle } from "@/components/blocks/news-article";
import { NewsCard } from "@/components/blocks/news-card";
import { Section } from "@/components/blocks/section";
import { articleCopy, shareLinks } from "@/content/news";
import { getNewsArticle, getNewsSlugs } from "@/lib/mock-data";

export function generateStaticParams() {
  return getNewsSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/news/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const article = getNewsArticle(slug);
  return article ? { title: article.title, description: article.excerpt } : {};
}

export default async function NewsArticlePage(
  props: PageProps<"/news/[slug]">,
) {
  const { slug } = await props.params;
  const article = getNewsArticle(slug);
  if (!article) notFound();

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

      <NewsArticle
        title={article.title}
        date={article.date}
        dateTime={article.dateTime}
        category={article.category}
        tint={article.tint}
        body={article.body}
        product={article.product}
        share={shareLinks}
        labels={articleCopy.labels}
      />

      {article.related.length > 0 && (
        <Section
          title={articleCopy.relatedTitle}
          titleSize="md"
          className="tablet:px-10 tablet:pt-0 tablet:pb-24 px-[18px] pt-8 pb-10"
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
