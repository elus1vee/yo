import { type Node as HtmlNode, NodeType, parse } from "node-html-parser";
import type { Product } from "../../src/payload-types";

/**
 * WordPress content → Lexical JSON (the shape Payload's richText field
 * stores and src/components/ui/rich-text.tsx renders). Keeps paragraphs,
 * headings, lists and links; strips Gutenberg block comments, WP shortcodes,
 * Elementor wrapper markup (divs/spans/etc. are unwrapped — their text and
 * any allowed descendants survive, the tag itself doesn't), scripts and
 * styles. Bold/italic survive as text formatting; anything else (images,
 * tables, embeds, inline styles/classes) is dropped — this is a lossy,
 * "keep the readable content" clean, not a full HTML→Lexical converter.
 */

type LexicalText = {
  type: "text";
  text: string;
  format: number;
  detail: 0;
  mode: "normal";
  style: "";
  version: 1;
};
type LexicalLink = {
  type: "link";
  fields: { linkType: "custom"; url: string; newTab: boolean };
  children: LexicalInline[];
  direction: "ltr";
  format: "";
  indent: 0;
  version: 1;
};
type LexicalInline = LexicalText | LexicalLink;
type LexicalParagraph = {
  type: "paragraph";
  children: LexicalInline[];
  direction: "ltr";
  format: "";
  indent: 0;
  version: 1;
};
type LexicalHeading = {
  type: "heading";
  tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: LexicalInline[];
  direction: "ltr";
  format: "";
  indent: 0;
  version: 1;
};
type LexicalListItem = {
  type: "listitem";
  value: number;
  children: LexicalInline[];
  direction: "ltr";
  format: "";
  indent: 0;
  version: 1;
};
type LexicalList = {
  type: "list";
  tag: "ul" | "ol";
  listType: "bullet" | "number";
  start: 1;
  children: LexicalListItem[];
  direction: "ltr";
  format: "";
  indent: 0;
  version: 1;
};
type LexicalBlock = LexicalParagraph | LexicalHeading | LexicalList;

const BOLD = 1;
const ITALIC = 2;

const text = (value: string, fmt = 0): LexicalText => ({
  type: "text",
  text: value,
  format: fmt,
  detail: 0,
  mode: "normal",
  style: "",
  version: 1,
});

const paragraph = (children: LexicalInline[]): LexicalParagraph => ({
  type: "paragraph",
  children,
  direction: "ltr",
  format: "",
  indent: 0,
  version: 1,
});

const HEADING_TAGS = new Set(["h1", "h2", "h3", "h4", "h5", "h6"]);

/** Inline children of a block element: text runs, bold/italic, links. */
function inlineChildren(node: HtmlNode, fmt = 0): LexicalInline[] {
  const out: LexicalInline[] = [];
  for (const child of node.childNodes) {
    if (child.nodeType === NodeType.TEXT_NODE) {
      const value = child.text.replace(/\s+/g, " ");
      if (value.trim() || out.length > 0) out.push(text(value, fmt));
      continue;
    }
    if (child.nodeType !== NodeType.ELEMENT_NODE) continue;
    const el = child as unknown as {
      rawTagName: string;
      getAttribute: (n: string) => string | undefined;
      childNodes: HtmlNode[];
    };
    const tag = el.rawTagName?.toLowerCase();
    if (tag === "script" || tag === "style") continue;
    if (tag === "br") {
      out.push(text("\n", fmt));
      continue;
    }
    if (tag === "strong" || tag === "b") {
      out.push(...inlineChildren(child, fmt | BOLD));
      continue;
    }
    if (tag === "em" || tag === "i") {
      out.push(...inlineChildren(child, fmt | ITALIC));
      continue;
    }
    if (tag === "a") {
      const href = el.getAttribute("href");
      const children = inlineChildren(child, fmt);
      if (href && children.length > 0) {
        out.push({
          type: "link",
          fields: { linkType: "custom", url: href, newTab: false },
          children,
          direction: "ltr",
          format: "",
          indent: 0,
          version: 1,
        });
      } else {
        out.push(...children);
      }
      continue;
    }
    // Unknown inline/wrapper tag: unwrap, keep its content.
    out.push(...inlineChildren(child, fmt));
  }
  // Trim a leading/trailing all-whitespace run so paragraphs built from
  // "<p>  <span>text</span>  </p>"-style markup don't carry stray spaces.
  while (out.length && out[0].type === "text" && !out[0].text.trim())
    out.shift();
  while (out.length) {
    const last = out.at(-1)!;
    if (last.type !== "text" || last.text.trim()) break;
    out.pop();
  }
  return out;
}

/** Top-level walk: collects block nodes, unwrapping div/span/section/etc. */
function blockChildren(node: HtmlNode): LexicalBlock[] {
  const out: LexicalBlock[] = [];
  let pendingInline: LexicalInline[] = [];

  const flushPending = () => {
    if (pendingInline.length > 0) {
      out.push(paragraph(pendingInline));
      pendingInline = [];
    }
  };

  for (const child of node.childNodes) {
    if (child.nodeType === NodeType.TEXT_NODE) {
      const value = child.text.replace(/\s+/g, " ");
      if (value.trim()) pendingInline.push(text(value));
      continue;
    }
    if (child.nodeType !== NodeType.ELEMENT_NODE) continue;
    const el = child as unknown as {
      rawTagName: string;
      childNodes: HtmlNode[];
    };
    const tag = el.rawTagName?.toLowerCase();
    if (tag === "script" || tag === "style") continue;

    if (tag === "p" || tag === "blockquote") {
      flushPending();
      const children = inlineChildren(child);
      if (children.length > 0) out.push(paragraph(children));
      continue;
    }
    if (tag && HEADING_TAGS.has(tag)) {
      flushPending();
      const children = inlineChildren(child);
      if (children.length > 0)
        out.push({
          type: "heading",
          tag: tag as LexicalHeading["tag"],
          children,
          direction: "ltr",
          format: "",
          indent: 0,
          version: 1,
        });
      continue;
    }
    if (tag === "ul" || tag === "ol") {
      flushPending();
      const items: LexicalListItem[] = [];
      let i = 0;
      for (const li of child.childNodes) {
        if (
          li.nodeType !== NodeType.ELEMENT_NODE ||
          (
            li as unknown as { rawTagName: string }
          ).rawTagName?.toLowerCase() !== "li"
        )
          continue;
        i += 1;
        const liChildren = inlineChildren(li);
        if (liChildren.length > 0)
          items.push({
            type: "listitem",
            value: i,
            children: liChildren,
            direction: "ltr",
            format: "",
            indent: 0,
            version: 1,
          });
      }
      if (items.length > 0)
        out.push({
          type: "list",
          tag,
          listType: tag === "ol" ? "number" : "bullet",
          start: 1,
          children: items,
          direction: "ltr",
          format: "",
          indent: 0,
          version: 1,
        });
      continue;
    }
    if (tag === "br") {
      pendingInline.push(text("\n"));
      continue;
    }

    // Unknown wrapper (div, span, section, figure, Elementor's own tags,
    // …): not itself content — recurse so its allowed descendants survive.
    const nested = blockChildren(child);
    if (nested.length > 0) {
      flushPending();
      out.push(...nested);
    } else {
      // No block-level content inside — treat as inline (handles stray
      // "<div>text</div>" some editors produce instead of a <p>).
      pendingInline.push(...inlineChildren(child));
    }
  }
  flushPending();
  return out;
}

/** Strips WP shortcodes ("[gallery ids=1,2]", "[/vc_row]") before parsing. */
function stripShortcodes(html: string): string {
  return html.replace(/\[\/?[a-z][a-z0-9_-]*(?:\s[^\]]*)?\]/gi, "");
}

export interface LexicalDoc {
  root: {
    type: "root";
    children: LexicalBlock[];
    direction: "ltr";
    format: "";
    indent: 0;
    version: 1;
  };
}

/**
 * Same JSON shape Payload's richText field generates types for (Product.
 * description, News.content, …) — `LexicalDoc` above is the precise,
 * internally-checked shape this module builds; this is that same value,
 * typed the way Payload's Local API wants it handed back (a plain
 * `[k: string]: unknown` bag, since the field can hold any Lexical node).
 */
export type PayloadRichText = NonNullable<Product["description"]>;

export function htmlToLexical(html: string): PayloadRichText {
  const cleaned = stripShortcodes(html ?? "");
  const dom = parse(cleaned, { comment: false });
  const children = blockChildren(dom);
  const doc: LexicalDoc = {
    root: {
      type: "root",
      children,
      direction: "ltr",
      format: "",
      indent: 0,
      version: 1,
    },
  };
  return doc as unknown as PayloadRichText;
}

/** True if the converted doc has no visible content (skip-worthy). */
export function isEmptyLexicalDoc(doc: PayloadRichText): boolean {
  return (doc as unknown as LexicalDoc).root.children.length === 0;
}
