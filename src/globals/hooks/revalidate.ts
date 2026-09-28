import type { GlobalAfterChangeHook } from "payload";
import { safeRevalidatePath } from "../../lib/revalidate";

/**
 * Header/Footer/Contacts feed the shared site layout (nav, phone, footer
 * columns are read on every page under it — see (frontend)/(site)/layout.tsx
 * and getHeaderContent/getFooterContent in lib/cms-content.ts pulling from
 * Contacts too), so their edits invalidate the whole layout rather than one
 * path.
 */
export const revalidateSiteLayout: GlobalAfterChangeHook = ({ doc }) => {
  safeRevalidatePath("/", "layout");
  return doc;
};

/** About and Partners (its "Где купить" tiles) only ever show on /about. */
export const revalidateAboutPage: GlobalAfterChangeHook = ({ doc }) => {
  safeRevalidatePath("/about");
  return doc;
};
