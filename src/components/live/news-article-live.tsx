"use client";

import { useLivePreview } from "@payloadcms/live-preview-react";
import {
  NewsArticle,
  type NewsArticleProps,
} from "@/components/blocks/news-article";
import { newsToView } from "@/lib/view/news";
import type { News } from "@/payload-types";

interface NewsArticleLiveProps {
  initialArticle: News;
  share: NewsArticleProps["share"];
  labels: NewsArticleProps["labels"];
}

/** Live-updating article body — see ProductDetailLive for how/why. */
export function NewsArticleLive({
  initialArticle,
  share,
  labels,
}: NewsArticleLiveProps) {
  const { data } = useLivePreview<News>({
    initialData: initialArticle,
    serverURL: typeof window !== "undefined" ? window.location.origin : "",
    depth: 2,
  });
  const article = newsToView(data);

  return (
    <NewsArticle
      title={article.title}
      date={article.date}
      dateTime={article.dateTime}
      category={article.category}
      tint={article.tint}
      cover={article.cover}
      body={article.body}
      product={article.product}
      share={share}
      labels={labels}
    />
  );
}
