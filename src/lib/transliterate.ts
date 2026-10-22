/**
 * Cyrillic → Latin, close enough to be readable in a URL (not a linguistic
 * transliteration standard). WordPress product slugs on clarity.by are
 * Cyrillic; our Payload slug field only accepts latin/digits/hyphens (see
 * collections/fields.ts) — content stays reachable at its old URL through
 * the redirect this script writes, not through slug preservation.
 */
const MAP: Record<string, string> = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  ё: "e",
  ж: "zh",
  з: "z",
  и: "i",
  й: "y",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "h",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "sch",
  ъ: "",
  ы: "y",
  ь: "",
  э: "e",
  ю: "yu",
  я: "ya",
};

export function transliterate(text: string): string {
  return text
    .toLowerCase()
    .split("")
    .map((ch) => MAP[ch] ?? ch)
    .join("");
}

/** Matches the pattern collections/fields.ts's slugField() validates. */
export function slugify(text: string): string {
  return transliterate(text)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}
