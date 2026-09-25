import type { CatalogProduct } from "@/components/blocks/catalog-product-card";
import type { OptionGroup, SpecItem } from "@/components/blocks/product-info";
import type { GalleryImage } from "@/components/blocks/product-gallery";
import type { CardTint } from "@/components/blocks/types";
import type { Copy } from "@/components/ui/responsive-text";
import { animalOptions, typeOptions } from "@/content/catalog";
import type { NewsCardProps } from "@/components/blocks/news-card";
import type { ProductCardProps } from "@/components/blocks/product-card";

/**
 * Sample catalog / news data taken from the home page mockup, used by the
 * /blocks preview. Real content will come from the CMS.
 */

export const products: ProductCardProps[] = [
  {
    name: "Наполнитель комкующийся Йо! TOFU Peach",
    href: "/catalog/tofu-peach",
    volume: "6 л / 2,5 кг",
    kind: "комкующийся",
    tint: "peach",
    image: { src: "/demo/pack-peach.jpeg", alt: "Йо! TOFU Peach" },
    badge: "Хит",
    tags: [
      { label: "Peach", tone: "peach", strong: true },
      { label: "Lavender", tone: "lavender" },
      { label: "Green tea", tone: "primary" },
    ],
    ctaLabel: "Подробнее",
  },
  {
    name: "Наполнитель силикагелевый Йо! Лаванда",
    href: "/catalog/lavender",
    volume: "12 л / 4,5 кг",
    kind: "силикагель",
    tint: "lavender",
    image: { src: "/demo/pack-lavender.jpeg", alt: "Йо! Лаванда" },
    tags: [
      { label: "12 л", tone: "lavender", strong: true },
      { label: "8 л", tone: "lavender" },
      { label: "4 л", tone: "lavender" },
    ],
    ctaLabel: "Подробнее",
  },
  {
    name: "Лакомства для собак Йо! Бычий корень",
    href: "/catalog/bull-root",
    volume: "100 г",
    kind: "сушёное",
    tint: "neutral",
    tags: [
      { label: "100 г", tone: "primary", strong: true },
      { label: "250 г", tone: "primary" },
    ],
    ctaLabel: "Подробнее",
  },
  {
    name: "Бальзам-кондиционер Йо! для всех типов шерсти",
    href: "/catalog/balm",
    volume: "500 мл",
    kind: "косметика",
    tint: "primary",
    tags: [
      { label: "500 мл", tone: "primary", strong: true },
      { label: "250 мл", tone: "primary" },
    ],
    ctaLabel: "Подробнее",
  },
];

/**
 * News (7 items from the Yo News List mockup, newest first). Only the first
 * article has the full text from the Yo News Article mockup; the others fall
 * back to their teaser as the only paragraph until the CMS provides a body.
 */
export interface NewsArticleData {
  slug: string;
  title: string;
  date: string;
  dateTime: string;
  category: string;
  excerpt: string;
  tint: CardTint;
  body: string[];
  /** Catalog slug of the product the article is about. */
  productSlug?: string;
}

const articles: NewsArticleData[] = [
  {
    slug: "tofu-three-scents",
    title: "Йо! TOFU выходит в трёх ароматах",
    date: "12 сентября 2026",
    dateTime: "2026-09-12",
    category: "продукт",
    excerpt:
      "К классическому TOFU добавились Lavender и Green Tea — мягче, чем прежде.",
    tint: "peach",
    body: [
      "Комкующийся наполнитель Йо! TOFU уже несколько лет остаётся одним из самых спокойных решений в линейке — мягкая текстура, минимум пыли и быстрое формирование комков. С этого месяца к классическому аромату добавляются ещё два: Lavender и Green Tea.",
      "Оба новых аромата подбирались с расчётом на чувствительных животных — без резких парфюмерных нот, только лёгкий природный оттенок. Формула самого наполнителя не изменилась: тот же состав на основе тофу, та же скорость впитывания.",
      "Обновлённая линейка уже поступает в зоомагазины-партнёры и будет доступна на маркетплейсах в течение сентября. Объём упаковки остаётся прежним — 6 л / 2,5 кг.",
    ],
    productSlug: "tofu-peach",
  },
  {
    slug: "ph-litter-tests",
    title: "Наполнитель-индикатор pH: первые тесты",
    date: "28 августа 2026",
    dateTime: "2026-08-28",
    category: "разработка",
    excerpt:
      "Показываем ранние образцы наполнителя, меняющего цвет по pH мочи.",
    tint: "primary",
    body: [],
  },
  {
    slug: "expo-minsk",
    title: "«Йо!» на выставке зоотоваров в Минске",
    date: "15 августа 2026",
    dateTime: "2026-08-15",
    category: "событие",
    excerpt: "Показали новую линейку косметики и пообщались с зоомагазинами.",
    tint: "lavender",
    body: [],
  },
  {
    slug: "dog-treats-batch",
    title: "Новая партия лакомств для собак",
    date: "3 августа 2026",
    dateTime: "2026-08-03",
    category: "продукт",
    excerpt: "Бычий корень теперь в двух форматах — 100 г и 250 г.",
    tint: "neutral",
    body: [],
    productSlug: "bull-root",
  },
  {
    slug: "kitten-litter-guide",
    title: "Как выбрать наполнитель для котёнка",
    date: "22 июля 2026",
    dateTime: "2026-07-22",
    category: "советы",
    excerpt:
      "Разбираем разницу между комкующимся и силикагелевым наполнителем.",
    tint: "peach",
    body: [],
  },
  {
    slug: "korona-network",
    title: "Йо! теперь в сети «Корона»",
    date: "9 июля 2026",
    dateTime: "2026-07-09",
    category: "дистрибуция",
    excerpt: "Полная линейка наполнителей и лакомств доступна в 40 магазинах.",
    tint: "primary",
    body: [],
  },
  {
    slug: "derm-test",
    title: "Косметика Йо! прошла дерматологический тест",
    date: "18 июня 2026",
    dateTime: "2026-06-18",
    category: "продукт",
    excerpt:
      "Бальзам-кондиционер и шампунь протестированы независимой лабораторией.",
    tint: "lavender",
    body: [],
    productSlug: "balm",
  },
];

const READ_MORE = "Читать";

function newsCardOf(a: NewsArticleData, withCategory: boolean): NewsCardProps {
  return {
    title: a.title,
    href: `/news/${a.slug}`,
    date: a.date,
    dateTime: a.dateTime,
    category: withCategory ? a.category : undefined,
    excerpt: a.excerpt,
    tint: a.tint,
    readMoreLabel: READ_MORE,
  };
}

/** Latest three, for the home page (no teaser / category shown there). */
export const news: NewsCardProps[] = articles
  .slice(0, 3)
  .map((a) => ({ ...newsCardOf(a, false), excerpt: undefined }));

/** Everything, for the news list (with category and teaser). */
export const newsList: NewsCardProps[] = articles.map((a) =>
  newsCardOf(a, true),
);

export interface NewsArticlePage extends NewsArticleData {
  product?: { name: string; meta: string; href: string };
  related: NewsCardProps[];
}

export function getNewsSlugs(): string[] {
  return articles.map((a) => a.slug);
}

/** Lookup by array search (not by object key), so odd slugs can't hit prototypes. */
export function getNewsArticle(slug: string): NewsArticlePage | undefined {
  const article = articles.find((a) => a.slug === slug);
  if (!article) return undefined;

  const linked = article.productSlug
    ? catalogProducts.find((p) => p.slug === article.productSlug)
    : undefined;
  const detail = article.productSlug
    ? getProductDetail(article.productSlug)
    : undefined;
  const typeLabel = typeOptions
    .find((t) => t.id === linked?.type)
    ?.label.toLowerCase();

  return {
    ...article,
    // Without a written body the teaser stands in for it.
    body: article.body.length > 0 ? article.body : [article.excerpt],
    product:
      linked && detail
        ? {
            name: detail.shortName,
            meta: [linked.volume, typeLabel].filter(Boolean).join(" · "),
            href: linked.href,
          }
        : undefined,
    related: articles
      .filter((a) => a.slug !== slug)
      .slice(0, 3)
      .map((a) => ({ ...newsCardOf(a, false), excerpt: undefined })),
  };
}

/**
 * Catalog listing (12 products from the Yo Catalog mockup). `animals` and
 * `type` are what the catalog filters match against.
 */
const photo = {
  peach: { src: "/demo/pack-peach.jpeg", alt: "Йо! TOFU Peach" },
  lavender: { src: "/demo/pack-lavender.jpeg", alt: "Йо! Лаванда" },
};

export const catalogProducts: CatalogProduct[] = [
  {
    slug: "tofu-peach",
    name: "Наполнитель комкующийся Йо! TOFU Peach",
    href: "/catalog/tofu-peach",
    animals: ["cats"],
    type: "litter",
    volume: "6 л / 2,5 кг",
    tint: "peach",
    tagTone: "peach",
    image: photo.peach,
  },
  {
    slug: "tofu-lavender",
    name: "Наполнитель комкующийся Йо! TOFU Lavender",
    href: "/catalog/tofu-lavender",
    animals: ["cats"],
    type: "litter",
    volume: "6 л / 2,5 кг",
    tint: "lavender",
    tagTone: "lavender",
    image: photo.lavender,
  },
  {
    slug: "tofu-green-tea",
    name: "Наполнитель комкующийся Йо! TOFU Green Tea",
    href: "/catalog/tofu-green-tea",
    animals: ["cats"],
    type: "litter",
    volume: "6 л / 2,5 кг",
    tint: "primary",
    tagTone: "primary",
    imageCaption: "упаковка",
  },
  {
    slug: "silica-lavender",
    name: "Наполнитель силикагелевый Йо! Лаванда",
    href: "/catalog/silica-lavender",
    animals: ["cats"],
    type: "litter",
    volume: "12 л / 4,5 кг",
    tint: "lavender",
    tagTone: "lavender",
    image: photo.lavender,
  },
  {
    slug: "wood-rodents",
    name: "Наполнитель древесный Йо! для грызунов",
    href: "/catalog/wood-rodents",
    animals: ["rodents"],
    type: "litter",
    volume: "5 л",
    tint: "primary",
    tagTone: "primary",
    imageCaption: "упаковка",
  },
  {
    slug: "bull-root",
    name: "Лакомства для собак Йо! Бычий корень",
    href: "/catalog/bull-root",
    animals: ["dogs"],
    type: "treats",
    volume: "100 г",
    tint: "neutral",
    tagTone: "primary",
    tagStrong: true,
    imageCaption: "упаковка",
  },
  {
    slug: "chicken-papaya",
    name: "Лакомства для кошек Йо! Курица и папайя",
    href: "/catalog/chicken-papaya",
    animals: ["cats"],
    type: "treats",
    volume: "50 г",
    tint: "peach",
    tagTone: "peach",
    tagStrong: true,
    imageCaption: "упаковка",
  },
  {
    slug: "dry-lamb-cats",
    name: "Корм сухой Йо! для кошек, ягнёнок",
    href: "/catalog/dry-lamb-cats",
    animals: ["cats"],
    type: "food",
    volume: "1,5 кг",
    tint: "lavender",
    tagTone: "lavender",
    tagStrong: true,
    imageCaption: "упаковка",
  },
  {
    slug: "dry-turkey-dogs",
    name: "Корм сухой Йо! для собак, индейка",
    href: "/catalog/dry-turkey-dogs",
    animals: ["dogs"],
    type: "food",
    volume: "2 кг",
    tint: "primary",
    tagTone: "primary",
    tagStrong: true,
    imageCaption: "упаковка",
  },
  {
    slug: "balm",
    name: "Бальзам-кондиционер Йо! для всех типов шерсти",
    href: "/catalog/balm",
    animals: ["cats", "dogs"],
    type: "care",
    volume: "500 мл",
    tint: "primary",
    tagTone: "primary",
    tagStrong: true,
    imageCaption: "упаковка",
  },
  {
    slug: "shampoo",
    name: "Шампунь гипоаллергенный Йо!",
    href: "/catalog/shampoo",
    animals: ["cats", "dogs"],
    type: "care",
    volume: "250 мл",
    tint: "lavender",
    tagTone: "lavender",
    tagStrong: true,
    imageCaption: "упаковка",
  },
  {
    slug: "odor-spray",
    name: "Спрей-нейтрализатор запаха Йо! для дома",
    href: "/catalog/odor-spray",
    animals: ["cats", "dogs", "rodents"],
    type: "home",
    volume: "300 мл",
    tint: "neutral",
    tagTone: "neutral",
    imageCaption: "упаковка",
  },
];

/**
 * Product page data, looked up by slug. Only "tofu-peach" carries the full
 * copy from the Yo Product mockup; the other products get their gallery,
 * specs and related items derived from the catalog entry (no description
 * until the CMS provides one).
 */
export interface ProductDetail {
  slug: string;
  name: string;
  /** Last breadcrumb, e.g. "Йо! TOFU". */
  shortName: string;
  /** Id from the catalog "types" options. */
  type: string;
  /** e.g. "для кошек" — goes after the type in the eyebrow. */
  audience: string;
  description?: Copy;
  gallery: GalleryImage[];
  groups: OptionGroup[];
  specs: SpecItem[];
  /** Slugs of similar products, in display order. */
  related: string[];
}

const animalLabel = new Map(animalOptions.map((a) => [a.id, a.label]));
const genitive: Record<string, string> = {
  cats: "кошек",
  dogs: "собак",
  rodents: "грызунов",
};

function audienceOf(animals: string[]) {
  if (animals.length >= 3) return "для всех питомцев";
  return `для ${animals.map((a) => genitive[a] ?? a).join(" и ")}`;
}

function galleryOf(p: CatalogProduct): GalleryImage[] {
  const gallery: GalleryImage[] = [
    {
      id: "main",
      alt: p.name,
      src: p.image?.src,
      tint: p.tint,
      caption: p.imageCaption ?? "упаковка",
    },
    {
      id: "back",
      alt: `${p.name} — упаковка сзади`,
      tint: "neutral",
      caption: "упаковка сзади",
    },
  ];
  if (p.type === "litter") {
    gallery.push({
      id: "texture",
      alt: `${p.name} — текстура гранул`,
      tint: "neutral",
      caption: "текстура гранул",
    });
  }
  return gallery;
}

function relatedOf(p: CatalogProduct): string[] {
  const others = catalogProducts.filter((o) => o.slug !== p.slug);
  const sameType = others.filter((o) => o.type === p.type);
  return [...sameType, ...others.filter((o) => o.type !== p.type)]
    .slice(0, 4)
    .map((o) => o.slug);
}

function detailOf(p: CatalogProduct): ProductDetail {
  return {
    slug: p.slug,
    name: p.name,
    shortName: p.name,
    type: p.type,
    audience: audienceOf(p.animals),
    gallery: galleryOf(p),
    groups: [],
    specs: [
      { label: "Объём / вес", value: p.volume },
      {
        label: "Для кого",
        value: p.animals.map((a) => animalLabel.get(a) ?? a).join(", "),
      },
    ],
    related: relatedOf(p),
  };
}

const tofuPeach = catalogProducts.find((p) => p.slug === "tofu-peach")!;

const peachDetail: ProductDetail = {
  ...detailOf(tofuPeach),
  name: "Наполнитель комкующийся Йо! TOFU Peach",
  shortName: "Йо! TOFU",
  description: {
    desktop:
      "Комкующийся наполнитель на основе тофу с ароматом персика. Быстро формирует плотные комки, не пылит и легко убирается совком. Подходит для ежедневного использования.",
    mobile:
      "Комкующийся наполнитель на основе тофу с мягким ароматом. Не пылит, легко убирается совком.",
  },
  groups: [
    {
      id: "volume",
      label: "Объём",
      options: [
        { id: "6l", label: "6 л / 2,5 кг" },
        { id: "12l", label: "12 л / 5 кг" },
      ],
    },
  ],
  specs: [
    { label: "Объём / вес", fromGroup: "volume" },
    { label: "Аромат", value: "Peach" },
    { label: "Для кого", value: "Кошки" },
  ],
  related: ["silica-lavender", "wood-rodents", "bull-root", "balm"],
};

const productDetails: ProductDetail[] = catalogProducts.map((p) =>
  p.slug === tofuPeach.slug ? peachDetail : detailOf(p),
);

/** Lookup by array search (not by object key), so odd slugs can't hit prototypes. */
export function getProductDetail(slug: string): ProductDetail | undefined {
  return productDetails.find((p) => p.slug === slug);
}

export function getProductSlugs(): string[] {
  return productDetails.map((p) => p.slug);
}

export function getRelatedProducts(detail: ProductDetail): CatalogProduct[] {
  return detail.related
    .map((slug) => catalogProducts.find((p) => p.slug === slug))
    .filter((p): p is CatalogProduct => Boolean(p));
}
