import { sql, type MigrateDownArgs, type MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> { await db.execute(sql`
  CREATE TYPE "public"."enum_articles_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_guides_status" AS ENUM('draft', 'published');
  CREATE TABLE "articles" ("id" serial PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "slug" varchar NOT NULL, "excerpt" varchar NOT NULL, "body" varchar NOT NULL, "cover_image_id" integer, "author_name" varchar NOT NULL, "published_at" timestamp(3) with time zone, "status" "enum_articles_status" DEFAULT 'draft' NOT NULL, "seo_meta_title" varchar, "seo_meta_description" varchar, "seo_indexing" varchar DEFAULT 'auto', "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL, "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL);
  CREATE TABLE "articles_sources" ("_order" integer NOT NULL, "_parent_id" integer NOT NULL, "id" varchar PRIMARY KEY NOT NULL, "label" varchar NOT NULL, "url" varchar NOT NULL);
  CREATE TABLE "guides" ("id" serial PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "slug" varchar NOT NULL, "excerpt" varchar NOT NULL, "body" varchar NOT NULL, "cover_image_id" integer, "author_name" varchar NOT NULL, "published_at" timestamp(3) with time zone, "status" "enum_guides_status" DEFAULT 'draft' NOT NULL, "seo_meta_title" varchar, "seo_meta_description" varchar, "seo_indexing" varchar DEFAULT 'auto', "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL, "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL);
  CREATE TABLE "guides_sources" ("_order" integer NOT NULL, "_parent_id" integer NOT NULL, "id" varchar PRIMARY KEY NOT NULL, "label" varchar NOT NULL, "url" varchar NOT NULL);
  CREATE UNIQUE INDEX "articles_slug_idx" ON "articles" USING btree ("slug"); CREATE UNIQUE INDEX "guides_slug_idx" ON "guides" USING btree ("slug");
`)}
export async function down({ db }: MigrateDownArgs): Promise<void> { await db.execute(sql`DROP TABLE IF EXISTS "guides_sources"; DROP TABLE IF EXISTS "guides"; DROP TABLE IF EXISTS "articles_sources"; DROP TABLE IF EXISTS "articles"; DROP TYPE IF EXISTS "public"."enum_guides_status"; DROP TYPE IF EXISTS "public"."enum_articles_status";`) }
