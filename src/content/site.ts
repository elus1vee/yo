import type { ContactFormCopy } from "@/components/blocks/contact-form";
import type { FooterProps } from "@/components/blocks/footer";
import type { HeaderProps } from "@/components/blocks/header";
import { telHref } from "@/lib/safe-url";

/**
 * Site-wide content for the layout blocks. Text, phone numbers and the
 * requisites come from the design handoff (Yo-C-Vitrina.dc.html).
 *
 * TODO: the messenger / social URLs and the /privacy path are not in the
 * handoff (the mockup links are "#") — fill in the real ones.
 */

export const PHONE_MAIN = "+375 29 657 93 71";
export const PHONE_SECOND = "+375 29 620 96 52";
export const EMAIL = "info@clarity.by";
export const ADDRESS = "г. Минск, ул. Лещинского, 8-2";

const nav = [
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
const yoMarkCream = { ...yoMark, src: "/brand/yo-mark-cream.svg" };
const clarityBadge = {
  src: "/brand/clarity-badge.svg",
  alt: "Clarity",
  width: 1000,
  height: 1000,
};

export const header: HeaderProps = {
  home: { href: "/", label: "«Йо!» — на главную" },
  yoLogo: yoMark,
  clarityLogo: clarityBadge,
  nav,
  phone: PHONE_MAIN,
  messengers: [
    { kind: "telegram", href: "#", label: "Написать в Telegram" },
    { kind: "whatsapp", href: "#", label: "Написать в WhatsApp" },
    { kind: "viber", href: "#", label: "Написать в Viber" },
  ],
  labels: {
    nav: "Основное меню",
    openMenu: "Открыть меню",
    closeMenu: "Закрыть меню",
  },
};

export const footer: FooterProps = {
  yoLogo: yoMarkCream,
  clarityLogo: clarityBadge,
  requisites: ["ООО «Клэрити», УНП 191878316", "г. Минск, ул. Лещинского, 8-2"],
  columns: [
    { title: "Разделы", links: nav, hideOnMobile: true },
    {
      title: "Контакты",
      links: [
        { label: PHONE_MAIN, href: telHref(PHONE_MAIN) },
        { label: PHONE_SECOND, href: telHref(PHONE_SECOND) },
        { label: EMAIL, href: `mailto:${EMAIL}` },
      ],
    },
    {
      title: "Соцсети",
      rowOnMobile: true,
      links: [
        { label: "Instagram", href: "#" },
        { label: "Telegram", href: "#" },
        { label: "VK", href: "#" },
      ],
    },
  ],
  copyright: "© 2026 «Йо!»",
  legalLinks: [{ label: "Политика конфиденциальности", href: "/privacy" }],
};

export const contactForm: {
  copy: ContactFormCopy;
  contacts: { label: string; href: string }[];
} = {
  copy: {
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
  },
  contacts: [
    { label: PHONE_MAIN, href: telHref(PHONE_MAIN) },
    { label: EMAIL, href: `mailto:${EMAIL}` },
  ],
};
