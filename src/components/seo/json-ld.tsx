/**
 * Renders a schema.org object as an inline `<script type="application/ld+json">`.
 * `<` is escaped so a title/description containing "</script>" can't break
 * out of the tag — the site has no CSP restricting inline scripts.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
