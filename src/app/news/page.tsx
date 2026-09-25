import type { Metadata } from "next";
import { Footer } from "@/components/blocks/footer";
import { Header } from "@/components/blocks/header";
import { NewsList } from "@/components/blocks/news-list";
import { PageIntro } from "@/components/blocks/page-intro";
import { NEWS_PAGE_SIZE, newsIntro } from "@/content/news";
import { footer, header } from "@/content/site";
import { newsList } from "@/lib/mock-data";

export const metadata: Metadata = { title: newsIntro.title };

export default async function NewsPage(props: PageProps<"/news">) {
  // `/news?page=2` opens the list on that page.
  const { page } = await props.searchParams;
  const initialPage = Number(Array.isArray(page) ? page[0] : page);

  return (
    <>
      <Header {...header} />
      <main>
        <PageIntro {...newsIntro} />
        <NewsList
          items={newsList}
          pageSize={NEWS_PAGE_SIZE}
          initialPage={initialPage}
        />
      </main>
      <Footer {...footer} />
    </>
  );
}
