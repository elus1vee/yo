import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCms } from "./lib/payload";
import type { Redirect } from "./payload-types";

/**
 * Serves the "Редиректы" collection: the admin tab stores old-URL → new-URL
 * mappings (e.g. filled in by scripts/migrate-wp.ts), but nothing enforced
 * them — this is what actually 301s an old WordPress URL to its new page.
 * Runs on the Node.js runtime (Proxy's default since Next 16), so it can use
 * the Payload Local API directly instead of an extra HTTP round trip.
 */

const PATH_PREFIX: Record<
  NonNullable<NonNullable<Redirect["to"]>["reference"]>["relationTo"],
  string
> = {
  products: "/catalog",
  news: "/news",
  pages: "/legal",
};

function resolveDestination(redirect: Redirect): string | undefined {
  const to = redirect.to;
  if (!to) return undefined;
  if (to.type === "custom") return to.url ?? undefined;

  const ref = to.reference;
  if (!ref || typeof ref.value !== "object") return undefined; // unpopulated (no depth) or empty
  return `${PATH_PREFIX[ref.relationTo]}/${ref.value.slug}`;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const payload = await getCms();
  const { docs } = await payload.find({
    collection: "redirects",
    where: { from: { equals: pathname } },
    limit: 1,
    depth: 1,
    overrideAccess: true,
  });

  const destination = docs[0] && resolveDestination(docs[0]);
  if (!destination) return NextResponse.next();

  // 308: permanent, preserves the request method (matches a URL that moved for good).
  return NextResponse.redirect(new URL(destination, request.url), 308);
}

export const config = {
  matcher: [
    // Skip the Payload admin/API, Next internals, and anything that looks
    // like a static file (has a dot in the last segment) — no point querying
    // the DB for /favicon.ico or /_next/static/....
    "/((?!admin|api|_next/static|_next/image|.*\\..*).*)",
  ],
};
