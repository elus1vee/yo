import type { Messenger } from "@/components/blocks/types";
import type { PageIntroProps } from "@/components/blocks/page-intro";

/** Copy of the news pages (Yo News List / Yo News Article mockups). */

export const newsIntro: PageIntroProps = {
  eyebrow: "Новости",
  title: "Что нового у «Йо!»",
  description: {
    desktop: "Продуктовые релизы, разработка и события бренда.",
    mobile: "Релизы, разработка и события бренда.",
  },
};

export const newsListTitle = "Все новости";

/** Mockup shows 3 per page to demo the pager; production is meant to be 9. */
export const NEWS_PAGE_SIZE = 3;

export const articleCopy = {
  breadcrumbs: {
    label: "Хлебные крошки",
    home: "Главная",
    news: "Новости",
    /** The mockup uses a generic label for the last crumb. */
    article: "Статья",
  },
  labels: {
    aboutProduct: "О товаре",
    toProduct: "К товару",
    share: "Поделиться",
  },
  relatedTitle: "Похожие новости",
};

/**
 * TODO: real share URLs need the site's public origin, e.g.
 * https://t.me/share/url?url=<encoded article URL>. Placeholders until then.
 */
export const shareLinks: Messenger[] = [
  { kind: "telegram", href: "#", label: "Поделиться в Telegram" },
  { kind: "whatsapp", href: "#", label: "Поделиться в WhatsApp" },
  { kind: "viber", href: "#", label: "Поделиться в Viber" },
];
