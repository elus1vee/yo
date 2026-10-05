import type { ContactDetailsProps } from "@/components/blocks/contact-details";
import type { PageIntroProps } from "@/components/blocks/page-intro";
import type { Messenger } from "@/components/blocks/types";
import { telHref } from "@/lib/safe-url";
import { contactsSeo } from "@/content/seo";
import type { DeepPartial } from "@/lib/utils";
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
  contacts: DeepPartial<Contact>,
  messengers: Messenger[],
): ContactsContent {
  return {
    intro: {
      eyebrow: contacts.intro?.eyebrow ?? undefined,
      title: contacts.intro?.title || contactsSeo.title,
      description: contacts.intro?.description,
    },
    details: {
      items: [
        ...(contacts.address
          ? [
              {
                icon: "pin" as const,
                tint: "primary" as const,
                label: "Адрес",
                lines: [{ text: contacts.address }],
              },
            ]
          : []),
        ...(contacts.phone
          ? [
              {
                icon: "phone" as const,
                tint: "peach" as const,
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
            ]
          : []),
        ...(contacts.email
          ? [
              {
                icon: "mail" as const,
                tint: "lavender" as const,
                label: "Email",
                lines: [
                  { text: contacts.email, href: `mailto:${contacts.email}` },
                ],
              },
            ]
          : []),
      ],
      messengers: { label: "Написать в мессенджер", links: messengers },
      map: {
        caption:
          contacts.mapCaption ??
          (contacts.address ? `Карта: ${contacts.address}` : "Карта"),
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
