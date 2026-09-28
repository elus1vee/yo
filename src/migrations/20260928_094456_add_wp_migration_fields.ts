import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "products" ADD COLUMN "wp_id" numeric;
  ALTER TABLE "_products_v" ADD COLUMN "version_wp_id" numeric;
  ALTER TABLE "media" ADD COLUMN "source_url" varchar;
  CREATE UNIQUE INDEX "products_wp_id_idx" ON "products" USING btree ("wp_id");
  CREATE INDEX "_products_v_version_version_wp_id_idx" ON "_products_v" USING btree ("version_wp_id");
  CREATE UNIQUE INDEX "media_source_url_idx" ON "media" USING btree ("source_url");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "products_wp_id_idx";
  DROP INDEX "_products_v_version_version_wp_id_idx";
  DROP INDEX "media_source_url_idx";
  ALTER TABLE "products" DROP COLUMN "wp_id";
  ALTER TABLE "_products_v" DROP COLUMN "version_wp_id";
  ALTER TABLE "media" DROP COLUMN "source_url";`)
}
