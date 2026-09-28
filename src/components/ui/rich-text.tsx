import { type ComponentProps } from "react";
import {
  RichText as PayloadRichText,
  type JSXConvertersFunction,
} from "@payloadcms/richtext-lexical/react";
import { isExternalHref, safeHref } from "@/lib/safe-url";
import { cn } from "@/lib/utils";

type RichTextData = ComponentProps<typeof PayloadRichText>["data"];

export interface RichTextProps {
  /** A Payload richText field's value (Lexical JSON), e.g. Product.description. */
  data: RichTextData | null | undefined;
  className?: string;
}

/**
 * Renders a Lexical richText field as real HTML (paragraphs, bold, links,
 * lists, headings) instead of flattening it to plain text — this is what CMS
 * editors see reflected in the admin. Links go through `safeHref` like every
 * other link built from data in this project (the editor's URL field isn't
 * otherwise validated against `javascript:`/`data:` schemes).
 */
const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  paragraph: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children });
    if (!children?.length) return null;
    return (
      <p className="text-text-muted text-body [&:not(:last-child)]:mb-3">
        {children}
      </p>
    );
  },
  heading: ({ node, nodesToJSX }) => {
    const Tag = /^h[1-6]$/.test(node.tag) ? node.tag : "h4";
    const size =
      { h1: "text-h2", h2: "text-h3" }[node.tag as string] ?? "text-h4";
    return (
      <Tag className={cn("font-heading [&:not(:last-child)]:mb-3", size)}>
        {nodesToJSX({ nodes: node.children })}
      </Tag>
    );
  },
  list: ({ node, nodesToJSX }) => {
    const Tag = node.tag === "ol" ? "ol" : "ul";
    return (
      <Tag
        className={cn(
          "text-text-muted text-body flex flex-col gap-1 pl-5 [&:not(:last-child)]:mb-3",
          Tag === "ol" ? "list-decimal" : "list-disc",
        )}
      >
        {nodesToJSX({ nodes: node.children })}
      </Tag>
    );
  },
  link: ({ node, nodesToJSX }) => {
    const href = safeHref(node.fields.url ?? "#");
    const external = isExternalHref(href);
    return (
      <a
        href={href}
        className="text-primary hover:text-primary-hover underline underline-offset-2"
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {nodesToJSX({ nodes: node.children })}
      </a>
    );
  },
  autolink: ({ node, nodesToJSX }) => {
    const href = safeHref(node.fields.url ?? "#");
    const external = isExternalHref(href);
    return (
      <a
        href={href}
        className="text-primary hover:text-primary-hover underline underline-offset-2"
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {nodesToJSX({ nodes: node.children })}
      </a>
    );
  },
});

export function RichText({ data, className }: RichTextProps) {
  if (!data) return null;
  return (
    <PayloadRichText
      data={data}
      converters={converters}
      className={cn("flex flex-col", className)}
    />
  );
}
