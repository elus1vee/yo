import type { ContactDetailsProps } from "@/components/blocks/contact-details";
import type { PageIntroProps } from "@/components/blocks/page-intro";
import type { Messenger } from "@/components/blocks/types";
import { telHref } from "@/lib/safe-url";
import type { Contact } from "@/payload-types";

/**
 * Pure Payload-doc → view-prop mapper for the Contacts global — see
 * view/about.ts for why this is kept out of cms-content.ts. `messengers`
 * isn't part of the Contacts global (it's Header's), so it isn't
 * live-updated — same trade-off as "related" items on the product/news
 * pages.
 */

export interface ContactsContent {
  intro: PageIntroProps;
  details: ContactDetailsProps;
}

export function contactsToView(
  contacts: Contact,
  messengers: Messenger[],
): ContactsContent {
  return {
    intro: {
      eyebrow: contacts.intro.eyebrow ?? undefined,
      title: contacts.intro.title,
      description: contacts.intro.description,
    },
    details: {
      items: [
        {
          icon: "pin",
          tint: "primary",
          label: "Адрес",
          lines: [{ text: contacts.address }],
        },
        {
          icon: "phone",
          tint: "peach",
          label: "Телефоны",
          lines: [
            { text: contacts.phone, href: telHref(contacts.phone) },
            ...(contacts.phoneSecond
              ? [
                  {
                    text: contacts.phoneSecond,
                    href: telHref(contacts.phoneSecond),
                  },
                ]
              : []),
          ],
        },
        {
          icon: "mail",
          tint: "lavender",
          label: "Email",
          lines: [{ text: contacts.email, href: `mailto:${contacts.email}` }],
        },
      ],
      messengers: { label: "Написать в мессенджер", links: messengers },
      map: {
        caption: contacts.mapCaption ?? `Карта: ${contacts.address}`,
        address: contacts.address,
        coordinates:
          contacts.mapCoordinates?.lat != null &&
          contacts.mapCoordinates?.lng != null
            ? {
                lat: contacts.mapCoordinates.lat,
                lng: contacts.mapCoordinates.lng,
              }
            : undefined,
      },
    },
  };
}
