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
import { Footer } from "./globals/Footer";
import { Header } from "./globals/Header";
import { Partners } from "./globals/Partners";

const dirname = path.dirname(fileURLToPath(import.meta.url));

/** Collections that have their own public page (SEO tab, redirect targets). */
const pageCollections = ["products", "news", "pages"];

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
  },
  collections: [Products, News, Pages, Media, Users],
  globals: [Header, Footer, Partners],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET ?? "",
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI },
    migrationDir: path.resolve(dirname, "migrations"),
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
