import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "home" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"animal_images_cats_id" integer,
  	"animal_images_dogs_id" integer,
  	"animal_images_rodents_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "header" ADD COLUMN "logo_id" integer;
  ALTER TABLE "header" ADD COLUMN "clarity_badge_id" integer;
  ALTER TABLE "footer" ADD COLUMN "logo_id" integer;
  ALTER TABLE "about_production_items" ADD COLUMN "image_id" integer;
  ALTER TABLE "home" ADD CONSTRAINT "home_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_animal_images_cats_id_media_id_fk" FOREIGN KEY ("animal_images_cats_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_animal_images_dogs_id_media_id_fk" FOREIGN KEY ("animal_images_dogs_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_animal_images_rodents_id_media_id_fk" FOREIGN KEY ("animal_images_rodents_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "home_hero_image_idx" ON "home" USING btree ("hero_image_id");
  CREATE INDEX "home_animal_images_animal_images_cats_idx" ON "home" USING btree ("animal_images_cats_id");
  CREATE INDEX "home_animal_images_animal_images_dogs_idx" ON "home" USING btree ("animal_images_dogs_id");
  CREATE INDEX "home_animal_images_animal_images_rodents_idx" ON "home" USING btree ("animal_images_rodents_id");
  ALTER TABLE "header" ADD CONSTRAINT "header_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_clarity_badge_id_media_id_fk" FOREIGN KEY ("clarity_badge_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer" ADD CONSTRAINT "footer_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_production_items" ADD CONSTRAINT "about_production_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "header_logo_idx" ON "header" USING btree ("logo_id");
  CREATE INDEX "header_clarity_badge_idx" ON "header" USING btree ("clarity_badge_id");
  CREATE INDEX "footer_logo_idx" ON "footer" USING btree ("logo_id");
  CREATE INDEX "about_production_items_image_idx" ON "about_production_items" USING btree ("image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "home" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "home" CASCADE;
  ALTER TABLE "header" DROP CONSTRAINT "header_logo_id_media_id_fk";
  
  ALTER TABLE "header" DROP CONSTRAINT "header_clarity_badge_id_media_id_fk";
  
  ALTER TABLE "footer" DROP CONSTRAINT "footer_logo_id_media_id_fk";
  
  ALTER TABLE "about_production_items" DROP CONSTRAINT "about_production_items_image_id_media_id_fk";
  
  DROP INDEX "header_logo_idx";
  DROP INDEX "header_clarity_badge_idx";
  DROP INDEX "footer_logo_idx";
  DROP INDEX "about_production_items_image_idx";
  ALTER TABLE "header" DROP COLUMN "logo_id";
  ALTER TABLE "header" DROP COLUMN "clarity_badge_id";
  ALTER TABLE "footer" DROP COLUMN "logo_id";
  ALTER TABLE "about_production_items" DROP COLUMN "image_id";`)
}
