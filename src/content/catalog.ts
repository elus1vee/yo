import type { CatalogCopy } from "@/components/blocks/catalog-browser";
import type { FilterOption } from "@/components/blocks/filter-group";
import type { PageIntroProps } from "@/components/blocks/page-intro";

/**
 * Copy and filter options of the catalog page (Yo Catalog.dc.html).
 * Ids match the README data model: animals cats|dogs|rodents,
 * types litter|treats|food|care|home — they are also what
 * `/catalog?animal=…&type=…` links use.
 */

export const catalogIntro: PageIntroProps = {
  title: "Товары",
  description: {
    desktop:
      "Наполнители, лакомства, корма, косметика и товары для дома — выбирайте по питомцу и по типу.",
    mobile: "Выбирайте по питомцу и по типу товара.",
  },
};

export const animalOptions: FilterOption[] = [
  { id: "cats", label: "Кошки" },
  { id: "dogs", label: "Собаки" },
  { id: "rodents", label: "Грызуны" },
];

export const typeOptions: FilterOption[] = [
  { id: "litter", label: "Наполнители" },
  { id: "treats", label: "Лакомства" },
  { id: "food", label: "Корма" },
  { id: "care", label: "Косметика" },
  { id: "home", label: "Для дома" },
];

export const catalogCopy: CatalogCopy = {
  animalsLabel: "по животным",
  typesLabel: "по типу товара",
  reset: "Сбросить фильтры",
  loadMore: "Показать ещё",
  found: "Найдено товаров: {count}",
  productCta: "Подробнее",
  empty: {
    title: "Ничего не найдено",
    description: {
      desktop: "Попробуйте выбрать другое сочетание фильтров или сбросить их.",
      mobile: "Попробуйте изменить фильтры.",
    },
  },
};
