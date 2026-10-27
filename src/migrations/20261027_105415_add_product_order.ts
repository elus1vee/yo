import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'
import { generateNKeysBetween } from 'payload/shared'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "products" ADD COLUMN "_order" varchar;
  ALTER TABLE "_products_v" ADD COLUMN "version__order" varchar;
  CREATE INDEX "products__order_idx" ON "products" USING btree ("_order");
  CREATE INDEX "_products_v_version_version__order_idx" ON "_products_v" USING btree ("version__order");`)

  // Existing products start in the alphabetical order the catalog used to have,
  // so the site looks the same until someone drags a card. Same key generator
  // Payload itself uses for new products (appended to the end).
  const { rows } = await db.execute(sql`SELECT "id" FROM "products" ORDER BY "title", "id"`)
  const keys = generateNKeysBetween(null, null, rows.length)
  for (const [i, row] of rows.entries()) {
    await db.execute(sql`UPDATE "products" SET "_order" = ${keys[i]} WHERE "id" = ${row.id}`)
  }
  await db.execute(sql`
   UPDATE "_products_v" SET "version__order" = p."_order"
    FROM "products" p WHERE "_products_v"."parent_id" = p."id"`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "products__order_idx";
  DROP INDEX "_products_v_version_version__order_idx";
  ALTER TABLE "products" DROP COLUMN "_order";
  ALTER TABLE "_products_v" DROP COLUMN "version__order";`)
}
