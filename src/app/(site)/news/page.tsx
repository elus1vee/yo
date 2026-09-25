import type { Metadata } from "next";
import { NewsList } from "@/components/blocks/news-list";
import { PageIntro } from "@/components/blocks/page-intro";
import { NEWS_PAGE_SIZE, newsIntro } from "@/content/news";
import { newsList } from "@/lib/mock-data";

export const metadata: Metadata = { title: newsIntro.title };

export default async function NewsPage(props: PageProps<"/news">) {
  // `/news?page=2` opens the list on that page.
  const { page } = await props.searchParams;
  const initialPage = Number(Array.isArray(page) ? page[0] : page);

  return (
    <>
      <PageIntro {...newsIntro} />
      <NewsList
        items={newsList}
        pageSize={NEWS_PAGE_SIZE}
        initialPage={initialPage}
      />
    </>
  );
}
