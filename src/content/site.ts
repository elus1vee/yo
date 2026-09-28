import type { ContactFormCopy } from "@/components/blocks/contact-form";
import type { NavItem } from "@/components/blocks/types";

/**
 * Static site chrome: brand assets and UI microcopy (button labels, form
 * placeholders, validation messages) that isn't editorial content and so
 * isn't in Payload — see the "О компании/Контакты в Payload" note in the
 * project's chat history for where that line is drawn. Nav, phone/email/
 * address, messenger links and footer requisites/socials now come from the
 * Payload globals — see src/lib/cms-content.ts.
 */

/** Anchor target of the "Где купить" links on the home and product pages. */
export const WHERE_TO_BUY_ID = "where-to-buy";

/** Nav shown if the Header global has no menu items yet (fresh install). */
export const siteNav: NavItem[] = [
  { label: "Товары", href: "/catalog" },
  { label: "О нас", href: "/about" },
  { label: "Новости", href: "/news" },
  { label: "Контакты", href: "/contacts" },
];

const yoMark = {
  src: "/brand/yo-mark.svg",
  alt: "Йо!",
  width: 720,
  height: 444,
};

export const brand = {
  name: "Йо!",
  yoMark,
  yoMarkCream: { ...yoMark, src: "/brand/yo-mark-cream.svg" },
  clarityBadge: {
    src: "/brand/clarity-badge.svg",
    alt: "Clarity",
    width: 1000,
    height: 1000,
  },
};

export const siteUiLabels = {
  header: {
    nav: "Основное меню",
    openMenu: "Открыть меню",
    closeMenu: "Закрыть меню",
  },
  copyright: "© 2026 «Йо!»",
  legalLinks: [
    { label: "Политика конфиденциальности", href: "/legal/privacy" },
  ] as NavItem[],
};

/** Copy of the contact form on the home page ("Напишите нам"). */
export const homeContactFormCopy: ContactFormCopy = {
  title: "Напишите нам",
  description: {
    desktop:
      "Вопросы о товарах, сотрудничестве и поставках. Отвечаем в рабочие часы.",
    mobile: "Вопросы о товарах и сотрудничестве.",
  },
  namePlaceholder: "Имя",
  phonePlaceholder: "Телефон",
  messagePlaceholder: "Сообщение",
  consent: {
    desktop:
      "Согласен на обработку персональных данных в соответствии с политикой конфиденциальности.",
    mobile: "Согласен на обработку персональных данных.",
  },
  submit: "Отправить",
  submitting: "Отправка…",
  errors: {
    nameRequired: "Введите имя",
    phoneRequired: "Введите телефон",
    phoneInvalid: "Проверьте формат номера: +375 XX XXX XX XX",
    messageTooLong: "Сообщение слишком длинное",
    consentRequired: "Отметьте согласие на обработку данных",
  },
};
