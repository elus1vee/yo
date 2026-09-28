import path from "path";
import { fileURLToPath } from "url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { formBuilderPlugin } from "@payloadcms/plugin-form-builder";
import { redirectsPlugin } from "@payloadcms/plugin-redirects";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";
import { Media } from "./collections/Media";
import { News } from "./collections/News";
import { Pages } from "./collections/Pages";
import { Products } from "./collections/Products";
import { Users } from "./collections/Users";
import { About } from "./globals/About";
import { Contacts } from "./globals/Contacts";
import { Footer } from "./globals/Footer";
import { Header } from "./globals/Header";
import { Partners } from "./globals/Partners";
import { SITE_URL } from "./lib/seo";

const dirname = path.dirname(fileURLToPath(import.meta.url));

/** Collections that have their own public page (SEO tab, redirect targets). */
const pageCollections = ["products", "news", "pages"];

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    // Shows a "Live Preview" tab on documents/globals with their own page,
    // rendering it in an iframe that live-updates as fields are edited
    // (before saving or publishing) via postMessage — see useLivePreview in
    // the corresponding "*-live.tsx" client components.
    livePreview: {
      collections: ["products", "news"],
      globals: ["about", "contacts"],
      url: ({ data, collectionConfig, globalConfig }) => {
        if (collectionConfig?.slug === "products")
          return `${SITE_URL}/catalog/${data.slug}`;
        if (collectionConfig?.slug === "news")
          return `${SITE_URL}/news/${data.slug}`;
        if (globalConfig?.slug === "about") return `${SITE_URL}/about`;
        if (globalConfig?.slug === "contacts") return `${SITE_URL}/contacts`;
        return SITE_URL;
      },
      breakpoints: [
        { name: "mobile", label: "Телефон", width: 390, height: 844 },
        { name: "desktop", label: "Десктоп", width: 1440, height: 900 },
      ],
    },
  },
  collections: [Products, News, Pages, Media, Users],
  globals: [Header, Footer, Partners, About, Contacts],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET ?? "",
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI },
    migrationDir: path.resolve(dirname, "migrations"),
    // We keep the schema in migrations (npm run payload -- migrate); the
    // adapter's own dev-mode auto-push (default outside NODE_ENV=production)
    // otherwise applies schema edits to the DB directly, ahead of and
    // without a migration file, which then makes `migrate` fail with
    // "column already exists" the next time it runs.
    push: false,
  }),
  sharp,
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  plugins: [
    seoPlugin({
      collections: pageCollections,
      uploadsCollection: "media",
      tabbedUI: true,
      generateTitle: ({ doc }) => `${doc?.title ?? ""} — Йо!`,
    }),
    formBuilderPlugin({ fields: { payment: false } }),
    redirectsPlugin({ collections: pageCollections }),
  ],
});
