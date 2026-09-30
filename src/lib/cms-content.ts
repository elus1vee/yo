import { cache } from "react";
import type { FooterProps } from "@/components/blocks/footer";
import type { HeaderProps } from "@/components/blocks/header";
import type { PartnerTileProps } from "@/components/blocks/partner-tile";
import type {
  CardImage,
  ImageAsset,
  Messenger,
  MessengerKind,
} from "@/components/blocks/types";
import { telHref } from "@/lib/safe-url";
import { getCms } from "@/lib/payload";
import { brand, siteNav, siteUiLabels } from "@/content/site";
import { aboutToView, type AboutContent } from "@/lib/view/about";
import { contactsToView, type ContactsContent } from "@/lib/view/contacts";
import type { About, Contact, Media } from "@/payload-types";

/** A Payload upload relation, as it comes back once `depth >= 1` resolves it. */
type UploadRelation = number | Media | null | undefined;

function isPopulatedMedia(value: UploadRelation): value is Media {
  return typeof value === "object" && value !== null && Boolean(value.url);
}

/** Resolves an upload field to a full-size `ImageAsset`, falling back to a static default. */
function mediaToImage(value: UploadRelation, fallback: ImageAsset): ImageAsset {
  if (!isPopulatedMedia(value)) return fallback;
  return {
    src: value.url ?? fallback.src,
    alt: value.alt || fallback.alt,
    width: value.width ?? fallback.width,
    height: value.height ?? fallback.height,
  };
}

/** Resolves an upload field to a `CardImage`, or `undefined` (renders the placeholder). */
function mediaToCardImage(value: UploadRelation): CardImage | undefined {
  return isPopulatedMedia(value)
    ? { src: value.url ?? "", alt: value.alt }
    : undefined;
}

/**
 * Site globals from Payload (Header, Footer, Partners, About, Contacts).
 * `cache()` dedupes repeated calls within one request — several pages fetch
 * the same global (e.g. Header, for its nav / messengers). The doc → view
 * mapping for About/Contacts lives in lib/view/*.ts (pure, also used by the
 * Live Preview components) — this file imports the (Node-only) Payload Local
 * API, so it can't be bundled for the client.
 */

const messengerAccessibleLabel: Record<MessengerKind, string> = {
  telegram: "Написать в Telegram",
  whatsapp: "Написать в WhatsApp",
  viber: "Написать в Viber",
};

export const messengerVisibleLabel: Record<MessengerKind, string> = {
  telegram: "Telegram",
  whatsapp: "WhatsApp",
  viber: "Viber",
};

const getHeaderGlobal = cache(async () => {
  const payload = await getCms();
  return payload.findGlobal({
    slug: "header",
    depth: 1,
    overrideAccess: false,
  });
});

const getFooterGlobal = cache(async () => {
  const payload = await getCms();
  return payload.findGlobal({
    slug: "footer",
    depth: 1,
    overrideAccess: false,
  });
});

const getHomeGlobal = cache(async () => {
  const payload = await getCms();
  return payload.findGlobal({ slug: "home", depth: 1, overrideAccess: false });
});

const getPartnersGlobal = cache(async () => {
  const payload = await getCms();
  return payload.findGlobal({
    slug: "partners",
    depth: 1,
    overrideAccess: false,
  });
});

const getAboutGlobal = cache(async (): Promise<About> => {
  const payload = await getCms();
  return payload.findGlobal({
    slug: "about",
    depth: 1,
    overrideAccess: false,
  });
});

const getContactsGlobal = cache(async (): Promise<Contact> => {
  const payload = await getCms();
  return payload.findGlobal({ slug: "contacts", overrideAccess: false });
});

export async function getHeaderContent(): Promise<HeaderProps> {
  const [header, contacts] = await Promise.all([
    getHeaderGlobal(),
    getContactsGlobal(),
  ]);
  return {
    home: { href: "/", label: `«${brand.name}» — на главную` },
    yoLogo: mediaToImage(header.logo, brand.yoMark),
    clarityLogo: mediaToImage(header.clarityBadge, brand.clarityBadge),
    nav:
      header.menuItems?.map(({ label, href }) => ({ label, href })) ?? siteNav,
    phone: contacts.phone,
    messengers: (header.messengers ?? []).map((m): Messenger => ({
      kind: m.kind,
      href: m.href,
      label: messengerAccessibleLabel[m.kind],
    })),
    labels: siteUiLabels.header,
  };
}

export async function getFooterContent(): Promise<FooterProps> {
  const [header, footer, contacts] = await Promise.all([
    getHeaderGlobal(),
    getFooterGlobal(),
    getContactsGlobal(),
  ]);
  const nav =
    header.menuItems?.map(({ label, href }) => ({ label, href })) ?? siteNav;

  return {
    yoLogo: mediaToImage(footer.logo, brand.yoMarkCream),
    clarityLogo: mediaToImage(header.clarityBadge, brand.clarityBadge),
    requisites: (footer.requisites ?? []).map((r) => r.line),
    columns: [
      { title: "Разделы", links: nav, hideOnMobile: true },
      {
        title: "Контакты",
        links: [
          { label: contacts.phone, href: telHref(contacts.phone) },
          ...(contacts.phoneSecond
            ? [
                {
                  label: contacts.phoneSecond,
                  href: telHref(contacts.phoneSecond),
                },
              ]
            : []),
          { label: contacts.email, href: `mailto:${contacts.email}` },
        ],
      },
      {
        title: "Соцсети",
        rowOnMobile: true,
        links: (footer.socials ?? []).map(({ label, href }) => ({
          label,
          href,
        })),
      },
    ],
    copyright: siteUiLabels.copyright,
    legalLinks: siteUiLabels.legalLinks,
  };
}

/** Partner tiles ("Где купить"), used on the About page. */
export async function getPartnersContent(): Promise<PartnerTileProps[]> {
  const partners = await getPartnersGlobal();
  return (partners.partners ?? []).map((p) => ({
    name: p.name,
    initial: p.name.slice(0, 2).toUpperCase(),
    tint: p.tint,
    logo:
      p.logo && typeof p.logo === "object" && p.logo.url
        ? { src: p.logo.url, alt: p.logo.alt }
        : undefined,
  }));
}

export async function getAboutContent(): Promise<AboutContent> {
  return aboutToView(await getAboutGlobal());
}

/** Decorative photos on the home page (hero, "Кому выбираем?" cards). */
export interface HomeMedia {
  hero?: CardImage;
  animals: {
    cats?: CardImage;
    dogs?: CardImage;
    rodents?: CardImage;
  };
}

export async function getHomeMedia(): Promise<HomeMedia> {
  const home = await getHomeGlobal();
  return {
    hero: mediaToCardImage(home.heroImage),
    animals: {
      cats: mediaToCardImage(home.animalImages?.cats),
      dogs: mediaToCardImage(home.animalImages?.dogs),
      rodents: mediaToCardImage(home.animalImages?.rodents),
    },
  };
}

/** Raw global doc, for the About page's Live Preview wrapper. */
export async function getAboutRaw(): Promise<About> {
  return getAboutGlobal();
}

/** Phone + email as a `NavItem[]`, for the home page's compact contact form. */
export async function getContactFacts() {
  const contacts = await getContactsGlobal();
  return [
    { label: contacts.phone, href: telHref(contacts.phone) },
    { label: contacts.email, href: `mailto:${contacts.email}` },
  ];
}

export async function getContactMessengers(): Promise<Messenger[]> {
  const header = await getHeaderGlobal();
  return (header.messengers ?? []).map((m) => ({
    kind: m.kind,
    href: m.href,
    label: messengerAccessibleLabel[m.kind],
    text: messengerVisibleLabel[m.kind],
  }));
}

export async function getContactsContent(): Promise<ContactsContent> {
  const [contacts, messengers] = await Promise.all([
    getContactsGlobal(),
    getContactMessengers(),
  ]);
  return contactsToView(contacts, messengers);
}

/** Raw global doc, for the Contacts page's Live Preview wrapper. */
export async function getContactsRaw(): Promise<Contact> {
  return getContactsGlobal();
}
