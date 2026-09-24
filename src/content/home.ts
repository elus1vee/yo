import type { AnimalCardProps } from "@/components/blocks/animal-card";
import type { AudiencePanelProps } from "@/components/blocks/audience-panel";
import type { CategoryLinkProps } from "@/components/blocks/category-link";
import type { HeroProps } from "@/components/blocks/hero";
import type { PhPromoProps } from "@/components/blocks/ph-promo";
import type { SectionAction } from "@/components/blocks/section";
import type { Copy } from "@/components/ui/responsive-text";

/**
 * Copy of the home page, taken from Yo-C-Vitrina.dc.html.
 *
 * TODO: routes are our guess (the mockup links are "#"): catalog filters
 * follow the README's `?animal=` / `?type=` scheme, "Где купить" points at
 * the About page's section, and CTAs that lead to the contact form use the
 * "#contact" anchor of the home page.
 */

export const hero: HeroProps = {
  eyebrow: {
    desktop: "Белорусский бренд · с 2014 года",
    mobile: "Белорусский бренд",
  },
  title: [
    { text: "Тепло, забота ", breakAfter: true },
    { text: "и " },
    { text: "здоровье", accent: true },
    { text: " каждый день" },
  ],
  description: {
    desktop:
      "Наполнители, лакомства, корма и косметика «Йо!» для кошек, собак и грызунов. Мягкие ароматы, честные составы.",
    mobile:
      "Наполнители, лакомства, корма и косметика «Йо!» для кошек, собак и грызунов.",
  },
  actions: [
    { label: "Смотреть товары", href: "/catalog", variant: "dark" },
    { label: "Где купить", href: "/about#where-to-buy", variant: "light" },
  ],
  mediaCaption: "фото / видео: кот и хозяин, 4:3",
  facts: [
    { value: "30 дней", label: "один пакет наполнителя" },
    { value: "4 линейки", label: "от наполнителей до косметики" },
  ],
};

export const animals: {
  title: string;
  aside: string;
  items: AnimalCardProps[];
} = {
  title: "Кому выбираем?",
  aside: "Три питомца - четыре линейки",
  items: [
    {
      name: "Кошки",
      href: "/catalog?animal=cats",
      tint: "primary",
      imageCaption: "фото кошки",
    },
    {
      name: "Собаки",
      href: "/catalog?animal=dogs",
      tint: "peach",
      imageCaption: "фото собаки",
    },
    {
      name: "Грызуны",
      href: "/catalog?animal=rodents",
      tint: "lavender",
      imageCaption: "фото грызуна",
    },
  ],
};

export const categories: CategoryLinkProps[] = [
  { label: "Наполнители", href: "/catalog?type=litter", dot: "primary" },
  { label: "Лакомства", href: "/catalog?type=treats", dot: "peach" },
  { label: "Корма", href: "/catalog?type=food", dot: "primary-light" },
  { label: "Косметика", href: "/catalog?type=care", dot: "lavender" },
];

export const productsSection: { title: Copy; action: SectionAction } = {
  title: { desktop: "Любимое у покупателей", mobile: "Любимое" },
  action: { label: "Все товары", mobileLabel: "Все", href: "/catalog" },
};

export const phPromo: PhPromoProps = {
  badge: "Скоро",
  title: [{ text: "Цвет, который " }, { text: "подскажет", accent: true }],
  description: {
    desktop:
      "Новый наполнитель меняет оттенок в зависимости от pH мочи. Достаточно посмотреть на лоток, чтобы заметить: питомцу пора к врачу.",
    mobile:
      "Новый наполнитель меняет оттенок в зависимости от pH мочи — достаточно взглянуть на лоток.",
  },
  action: { label: "Узнать первым", href: "#contact" },
  steps: [
    { value: "5,5", tone: "peach" },
    { value: "6,0", tone: "peach-tint" },
    { value: "6,5", tone: "primary-tint" },
    { value: "7,0", tone: "primary-light" },
    { value: "8,0", tone: "lavender" },
    { value: "9,0", tone: "lavender-deep" },
  ],
  captions: {
    start: { desktop: "кислая среда", mobile: "кислая" },
    middle: "норма",
    end: { desktop: "щелочная среда", mobile: "щелочная" },
  },
};

export const audiences: AudiencePanelProps[] = [
  {
    eyebrow: "покупателям",
    title: "Где купить «Йо!»",
    description: { desktop: "Маркетплейсы, сети и доставка по Беларуси." },
    tint: "peach",
    chips: ["Wildberries", "Яндекс Маркет", "Евроопт", "Корона", "Едоставка"],
    action: {
      label: "Все точки продаж",
      href: "/about#where-to-buy",
      variant: "dark",
    },
  },
  {
    eyebrow: "магазинам",
    title: "Стать партнёром",
    description: {
      desktop:
        "Оптовые поставки, прайс-лист и поддержка в продвижении для зоомагазинов.",
      mobile: "Оптовые поставки, прайс-лист и поддержка для зоомагазинов.",
    },
    tint: "lavender",
    features: [
      "Производство в Минске",
      "Отгрузка от одной паллеты",
      "POS-материалы и фотоконтент",
    ],
    action: { label: "Запросить условия", href: "#contact", variant: "light" },
  },
];

export const newsSection: { title: string; action: SectionAction } = {
  title: "Что нового",
  action: { label: "Все новости", mobileLabel: "Все", href: "/news" },
};
