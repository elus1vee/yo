import type { Metadata } from "next";
import { ContactsPageLive } from "@/components/live/contacts-page-live";
import { contactsForm } from "@/content/contacts";
import { contactsSeo } from "@/content/seo";
import { getContactMessengers, getContactsRaw } from "@/lib/cms-content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(contactsSeo);

export default async function ContactsPage() {
  const [contacts, messengers] = await Promise.all([
    getContactsRaw(),
    getContactMessengers(),
  ]);

  return (
    <ContactsPageLive
      initialContacts={contacts}
      messengers={messengers}
      formCopy={contactsForm}
    />
  );
}
