import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_products_variants_unit" AS ENUM('volume', 'weight');
  CREATE TYPE "public"."enum__products_v_version_variants_unit" AS ENUM('volume', 'weight');
  ALTER TABLE "products" ADD COLUMN "variants_unit" "enum_products_variants_unit" DEFAULT 'volume';
  ALTER TABLE "_products_v" ADD COLUMN "version_variants_unit" "enum__products_v_version_variants_unit" DEFAULT 'volume';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "products" DROP COLUMN "variants_unit";
  ALTER TABLE "_products_v" DROP COLUMN "version_variants_unit";
  DROP TYPE "public"."enum_products_variants_unit";
  DROP TYPE "public"."enum__products_v_version_variants_unit";`)
}
