import type { Metadata } from "next";
import { NewsList } from "@/components/blocks/news-list";
import { PageIntro } from "@/components/blocks/page-intro";
import { NEWS_PAGE_SIZE, newsIntro, newsListTitle } from "@/content/news";
import { newsSeo } from "@/content/seo";
import { newsList } from "@/lib/mock-data";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(newsSeo);

export default async function NewsPage(props: PageProps<"/news">) {
  // `/news?page=2` opens the list on that page.
  const { page } = await props.searchParams;
  const initialPage = Number(Array.isArray(page) ? page[0] : page);

  return (
    <>
      <PageIntro {...newsIntro} />
      <NewsList
        title={newsListTitle}
        items={newsList}
        pageSize={NEWS_PAGE_SIZE}
        initialPage={initialPage}
      />
    </>
  );
}
