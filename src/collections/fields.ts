import type { FieldHook, TextField } from "payload";
import { slugify } from "../lib/transliterate";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Fills an empty slug from the title (transliterated). A slug that is already
 * taken gets "-2", "-3"… appended. A slug the editor typed is left alone, and
 * so is an existing one on a partial update — URLs must not change silently.
 */
const fillSlug: FieldHook = async ({
  value,
  data,
  originalDoc,
  req,
  collection,
}) => {
  if (!collection) return value;
  if (typeof value === "string" && value.trim()) return value;
  if (value === undefined && originalDoc?.slug) return value;

  const base = slugify(String(data?.title ?? "")) || collection.slug;
  const { docs } = await req.payload.find({
    collection: collection.slug,
    where: {
      and: [
        { slug: { like: base } },
        ...(originalDoc?.id ? [{ id: { not_equals: originalDoc.id } }] : []),
      ],
    },
    limit: 0,
    depth: 0,
    select: { slug: true },
    pagination: false,
    overrideAccess: true,
    req,
  });
  const taken = new Set(docs.map((doc) => ("slug" in doc ? doc.slug : null)));

  let slug = base;
  for (let n = 2; taken.has(slug); n++) slug = `${base}-${n}`;
  return slug;
};

/**
 * URL slug. Latin only on purpose: pages look documents up by slug, and a
 * strict pattern keeps odd characters out of URLs. Left empty, it is generated
 * from the title on save (`fillSlug`), so an empty value passes validation here.
 */
export const slugField = (): TextField => ({
  name: "slug",
  type: "text",
  required: true,
  unique: true,
  index: true,
  admin: {
    position: "sidebar",
    description:
      "Заполняется автоматически из названия — можно оставить пустым. Свой вариант: латиница, цифры и дефисы, например tofu-peach",
  },
  hooks: { beforeValidate: [fillSlug] },
  validate: (value: string | null | undefined) =>
    !value || SLUG_PATTERN.test(value)
      ? true
      : "Только строчные латинские буквы, цифры и дефисы",
});
