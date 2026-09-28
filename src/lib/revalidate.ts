import { revalidatePath } from "next/cache";

/**
 * `revalidatePath` only works inside a live Next.js request (Route Handler
 * or Server Function) — Payload's own hooks also run from standalone
 * scripts (src/seed.ts, scripts/migrate-wp.ts, `payload migrate`, …), which
 * aren't Next.js requests at all and have nothing to invalidate. There it
 * throws; swallow that case instead of failing the write.
 */
export function safeRevalidatePath(path: string, type?: "layout" | "page") {
  try {
    revalidatePath(path, type);
  } catch {
    // no Next.js request context — e.g. running via `payload run`
  }
}
