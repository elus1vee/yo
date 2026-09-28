import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "contacts" ADD COLUMN "map_coordinates_lat" numeric;
  ALTER TABLE "contacts" ADD COLUMN "map_coordinates_lng" numeric;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "contacts" DROP COLUMN "map_coordinates_lat";
  ALTER TABLE "contacts" DROP COLUMN "map_coordinates_lng";`)
}
