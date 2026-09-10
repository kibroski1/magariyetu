import { sql, type MigrateDownArgs, type MigrateUpArgs } from '@payloadcms/db-postgres'

// Editor-controlled SEO overrides are deliberately nullable: generated values
// remain the default, and existing marketplace data continues to work unchanged.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "listings"
      ADD COLUMN IF NOT EXISTS "seo_meta_title" varchar,
      ADD COLUMN IF NOT EXISTS "seo_meta_description" varchar,
      ADD COLUMN IF NOT EXISTS "seo_indexing" varchar DEFAULT 'auto',
      ADD COLUMN IF NOT EXISTS "make_slug" varchar,
      ADD COLUMN IF NOT EXISTS "model_slug" varchar;

    UPDATE "listings"
      SET "make_slug" = trim(both '-' from regexp_replace(lower(trim("make")), '[^a-z0-9]+', '-', 'g')),
          "model_slug" = trim(both '-' from regexp_replace(lower(trim("model")), '[^a-z0-9]+', '-', 'g'))
      WHERE "make_slug" IS NULL OR "model_slug" IS NULL;

    CREATE INDEX IF NOT EXISTS "listings_make_slug_idx" ON "listings" USING btree ("make_slug");
    CREATE INDEX IF NOT EXISTS "listings_model_slug_idx" ON "listings" USING btree ("model_slug");

    ALTER TABLE "dealers"
      ADD COLUMN IF NOT EXISTS "seo_meta_title" varchar,
      ADD COLUMN IF NOT EXISTS "seo_meta_description" varchar,
      ADD COLUMN IF NOT EXISTS "seo_indexing" varchar DEFAULT 'auto';
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "listings_model_slug_idx";
    DROP INDEX IF EXISTS "listings_make_slug_idx";

    ALTER TABLE "listings"
      DROP COLUMN IF EXISTS "model_slug",
      DROP COLUMN IF EXISTS "make_slug",
      DROP COLUMN IF EXISTS "seo_indexing",
      DROP COLUMN IF EXISTS "seo_meta_description",
      DROP COLUMN IF EXISTS "seo_meta_title";

    ALTER TABLE "dealers"
      DROP COLUMN IF EXISTS "seo_indexing",
      DROP COLUMN IF EXISTS "seo_meta_description",
      DROP COLUMN IF EXISTS "seo_meta_title";
  `)
}
