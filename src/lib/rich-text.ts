import { convertLexicalToPlaintext } from "@payloadcms/richtext-lexical/plaintext";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

/**
 * Flattens a Lexical richText field to plain paragraphs (no bold/links/etc —
 * matches how NewsArticle/ProductInfo already render text: escaped, never as
 * HTML). Payload separates block-level nodes with a blank line.
 */
export function richTextToParagraphs(
  data: SerializedEditorState | null | undefined,
): string[] {
  if (!data) return [];
  const text = convertLexicalToPlaintext({ data });
  return text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
}

/** Same, joined into one string — for fields that render a single paragraph. */
export function richTextToPlainText(
  data: SerializedEditorState | null | undefined,
): string | undefined {
  const paragraphs = richTextToParagraphs(data);
  return paragraphs.length > 0 ? paragraphs.join(" ") : undefined;
}
