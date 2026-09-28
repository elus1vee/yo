import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Scent moves from a per-variant field (one product could in theory list
// several aromas) to a single field on the product itself — data migration
// below carries over each product's first non-empty variant scent before
// the old column is dropped, so existing content isn't silently lost.
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "products" ADD COLUMN "scent" varchar;
  ALTER TABLE "_products_v" ADD COLUMN "version_scent" varchar;
  UPDATE "products" p SET "scent" = v.scent FROM (
    SELECT DISTINCT ON (_parent_id) _parent_id, scent FROM "products_variants"
    WHERE scent IS NOT NULL ORDER BY _parent_id, _order
  ) v WHERE v._parent_id = p.id;
  ALTER TABLE "products_variants" DROP COLUMN "scent";
  ALTER TABLE "_products_v_version_variants" DROP COLUMN "scent";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "products_variants" ADD COLUMN "scent" varchar;
  ALTER TABLE "_products_v_version_variants" ADD COLUMN "scent" varchar;
  UPDATE "products_variants" pv SET "scent" = p.scent
  FROM "products" p
  WHERE p.id = pv._parent_id AND pv._order = 1 AND p.scent IS NOT NULL;
  ALTER TABLE "products" DROP COLUMN "scent";
  ALTER TABLE "_products_v" DROP COLUMN "version_scent";`)
}
