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

export const news: NewsCardProps[] = [
  {
    title: "Йо! TOFU выходит в трёх ароматах",
    href: "/news/tofu-three-scents",
    date: "12 сентября 2026",
    dateTime: "2026-09-12",
    tint: "peach",
    readMoreLabel: "Читать",
  },
  {
    title: "Наполнитель-индикатор pH: первые тесты",
    href: "/news/ph-litter-tests",
    date: "28 августа 2026",
    dateTime: "2026-08-28",
    tint: "primary",
    readMoreLabel: "Читать",
  },
  {
    title: "«Йо!» на выставке зоотоваров в Минске",
    href: "/news/expo-minsk",
    date: "15 августа 2026",
    dateTime: "2026-08-15",
    tint: "lavender",
    readMoreLabel: "Читать",
  },
];
