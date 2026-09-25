import type { FeatureTileProps } from "@/components/blocks/feature-tile";
import type { PageIntroProps } from "@/components/blocks/page-intro";
import type { PartnerTileProps } from "@/components/blocks/partner-tile";
import type { PhotoCardProps } from "@/components/blocks/photo-card";

/** Copy of the About page (Yo About.dc.html). */

export const aboutIntro: PageIntroProps = {
  eyebrow: "О компании",
  title: "Делаем товары, за которыми стоит наблюдение",
  description: {
    desktop:
      "«Йо!» — белорусская марка товаров для кошек, собак и грызунов. Наполнители, лакомства, корма и косметика производятся ООО «Клэрити» в Минске — с вниманием к составу и здоровью питомца в каждой линейке.",
    mobile:
      "«Йо!» — белорусская марка товаров для кошек, собак и грызунов. Производитель — ООО «Клэрити», Минск.",
  },
  media: { caption: "фото: производство, 4:3" },
};

export const production: { title: string; items: PhotoCardProps[] } = {
  title: "Производство и команда",
  items: [
    {
      tint: "peach",
      text: {
        desktop:
          "Собственная площадка в Минске — от смешивания сырья до фасовки готовой продукции.",
        mobile:
          "Собственная площадка в Минске — от сырья до готовой продукции.",
      },
    },
    {
      tint: "lavender",
      text: {
        desktop:
          "Технологи и ветеринарные консультанты проверяют каждую новую рецептуру перед запуском.",
        mobile:
          "Технологи и ветеринарные консультанты проверяют каждую рецептуру.",
      },
    },
    {
      tint: "primary",
      text: {
        desktop:
          "Контроль качества на каждом этапе — от входного сырья до партии на складе.",
        mobile: "Контроль качества на каждом этапе.",
      },
    },
  ],
};

export const certificates: { title: string; items: FeatureTileProps[] } = {
  title: "Сертификаты и стандарты",
  items: [
    {
      title: "СТБ",
      description: "Соответствие национальным стандартам качества.",
      tint: "primary",
    },
    {
      title: "Ветеринарный контроль",
      description: "Проверка каждой партии перед отгрузкой.",
      tint: "peach",
    },
    {
      title: "ISO 9001",
      description: "Система менеджмента качества производства.",
      tint: "lavender",
    },
    {
      title: "Дерматологический тест",
      description: "Косметика протестирована независимой лабораторией.",
      tint: "neutral",
    },
  ],
};

/** Anchor target of the "Где купить" links on the home and product pages. */
export const WHERE_TO_BUY_ID = "where-to-buy";

export const whereToBuy: {
  title: string;
  aside: string;
  items: PartnerTileProps[];
} = {
  title: "Где купить",
  aside: "товары «Йо!» доступны на маркетплейсах, в сетях и через доставку",
  items: [
    { name: "Wildberries", initial: "W", tint: "peach" },
    { name: "Яндекс Маркет", initial: "Я", tint: "lavender" },
    { name: "Евроопт", initial: "Е", tint: "primary" },
    { name: "Корона", initial: "К", tint: "neutral" },
    { name: "Едоставка", initial: "Ед", tint: "peach" },
  ],
};
