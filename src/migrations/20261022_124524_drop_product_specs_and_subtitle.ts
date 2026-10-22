import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // `specs` (weight / volume) is replaced by `variants`: where a product has no
  // variants yet, its specs value becomes the single variant, so nothing is
  // lost. A weight-only product also gets variants_unit = 'weight' (the label
  // used to come from the spec row itself). Done for the published rows and
  // for the version history (drafts newer than the published doc live there).
  await db.execute(sql`
   UPDATE "products" SET "variants_unit" = 'weight'
    WHERE NULLIF(btrim("specs_weight"), '') IS NOT NULL
      AND NULLIF(btrim("specs_volume"), '') IS NULL
      AND NOT EXISTS (SELECT 1 FROM "products_variants" pv WHERE pv."_parent_id" = "products"."id");
  INSERT INTO "products_variants" ("_order", "_parent_id", "id", "volume")
    SELECT 1, p."id", substr(md5(random()::text || p."id"::text), 1, 24),
      CASE
        WHEN NULLIF(btrim(p."specs_volume"), '') IS NOT NULL AND NULLIF(btrim(p."specs_weight"), '') IS NOT NULL
          THEN btrim(p."specs_volume") || ' / ' || btrim(p."specs_weight")
        ELSE COALESCE(NULLIF(btrim(p."specs_volume"), ''), NULLIF(btrim(p."specs_weight"), ''))
      END
    FROM "products" p
    WHERE (NULLIF(btrim(p."specs_volume"), '') IS NOT NULL OR NULLIF(btrim(p."specs_weight"), '') IS NOT NULL)
      AND NOT EXISTS (SELECT 1 FROM "products_variants" pv WHERE pv."_parent_id" = p."id");

  UPDATE "_products_v" SET "version_variants_unit" = 'weight'
    WHERE NULLIF(btrim("version_specs_weight"), '') IS NOT NULL
      AND NULLIF(btrim("version_specs_volume"), '') IS NULL
      AND NOT EXISTS (SELECT 1 FROM "_products_v_version_variants" vv WHERE vv."_parent_id" = "_products_v"."id");
  INSERT INTO "_products_v_version_variants" ("_order", "_parent_id", "volume", "_uuid")
    SELECT 1, v."id",
      CASE
        WHEN NULLIF(btrim(v."version_specs_volume"), '') IS NOT NULL AND NULLIF(btrim(v."version_specs_weight"), '') IS NOT NULL
          THEN btrim(v."version_specs_volume") || ' / ' || btrim(v."version_specs_weight")
        ELSE COALESCE(NULLIF(btrim(v."version_specs_volume"), ''), NULLIF(btrim(v."version_specs_weight"), ''))
      END,
      substr(md5(random()::text || v."id"::text), 1, 24)
    FROM "_products_v" v
    WHERE (NULLIF(btrim(v."version_specs_volume"), '') IS NOT NULL OR NULLIF(btrim(v."version_specs_weight"), '') IS NOT NULL)
      AND NOT EXISTS (SELECT 1 FROM "_products_v_version_variants" vv WHERE vv."_parent_id" = v."id");

  ALTER TABLE "products" DROP COLUMN "subtitle";
  ALTER TABLE "products" DROP COLUMN "specs_weight";
  ALTER TABLE "products" DROP COLUMN "specs_volume";
  ALTER TABLE "_products_v" DROP COLUMN "version_subtitle";
  ALTER TABLE "_products_v" DROP COLUMN "version_specs_weight";
  ALTER TABLE "_products_v" DROP COLUMN "version_specs_volume";`)
}

// The columns come back empty: the dropped subtitle / specs values are not restored.
export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "products" ADD COLUMN "subtitle" varchar;
  ALTER TABLE "products" ADD COLUMN "specs_weight" varchar;
  ALTER TABLE "products" ADD COLUMN "specs_volume" varchar;
  ALTER TABLE "_products_v" ADD COLUMN "version_subtitle" varchar;
  ALTER TABLE "_products_v" ADD COLUMN "version_specs_weight" varchar;
  ALTER TABLE "_products_v" ADD COLUMN "version_specs_volume" varchar;`)
}
