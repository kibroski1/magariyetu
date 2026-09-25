import { sql, type MigrateDownArgs, type MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TYPE "public"."enum_bazaar_events_status" AS ENUM('draft', 'published', 'cancelled');

    CREATE TYPE "public"."enum_bazaar_posts_status" AS ENUM('pending', 'published', 'rejected');

    CREATE TABLE "auction_yards" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "slug" varchar NOT NULL,
      "description" varchar,
      "county" varchar NOT NULL,
      "town" varchar,
      "physical_address" varchar,
      "contact_phone" varchar,
      "website" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE "auction_yards_auction_dates" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "auction_date" timestamp(3) with time zone NOT NULL,
      "title" varchar NOT NULL,
      "offering" varchar NOT NULL,
      "catalogue_url" varchar
    );

    CREATE TABLE "bazaar_events" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "slug" varchar NOT NULL,
      "event_date" timestamp(3) with time zone NOT NULL,
      "description" varchar NOT NULL,
      "county" varchar NOT NULL,
      "town" varchar NOT NULL,
      "venue" varchar NOT NULL,
      "entry_notes" varchar,
      "status" "enum_bazaar_events_status" DEFAULT 'draft',
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE "bazaar_posts" (
      "id" serial PRIMARY KEY NOT NULL,
      "event_id" integer,
      "owner_id" integer,
      "title" varchar NOT NULL,
      "vehicle_details" varchar NOT NULL,
      "description" varchar NOT NULL,
      "asking_price" numeric,
      "status" "enum_bazaar_posts_status" DEFAULT 'pending',
      "moderation_note" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    ALTER TABLE "auction_yards_auction_dates"
      ADD CONSTRAINT "auction_yards_auction_dates_parent_fk"
      FOREIGN KEY ("_parent_id")
      REFERENCES "public"."auction_yards"("id")
      ON DELETE cascade
      ON UPDATE no action;

    ALTER TABLE "bazaar_posts"
      ADD CONSTRAINT "bazaar_posts_event_id_bazaar_events_id_fk"
      FOREIGN KEY ("event_id")
      REFERENCES "public"."bazaar_events"("id")
      ON DELETE set null
      ON UPDATE no action;

    ALTER TABLE "bazaar_posts"
      ADD CONSTRAINT "bazaar_posts_owner_id_users_id_fk"
      FOREIGN KEY ("owner_id")
      REFERENCES "public"."users"("id")
      ON DELETE set null
      ON UPDATE no action;

    CREATE UNIQUE INDEX "auction_yards_slug_idx"
      ON "auction_yards" USING btree ("slug");

    CREATE INDEX "auction_yards_auction_dates_order_idx"
      ON "auction_yards_auction_dates" USING btree ("_order");

    CREATE INDEX "auction_yards_auction_dates_parent_idx"
      ON "auction_yards_auction_dates" USING btree ("_parent_id");

    CREATE UNIQUE INDEX "bazaar_events_slug_idx"
      ON "bazaar_events" USING btree ("slug");

    CREATE INDEX "bazaar_events_event_date_idx"
      ON "bazaar_events" USING btree ("event_date");

    CREATE INDEX "bazaar_posts_event_idx"
      ON "bazaar_posts" USING btree ("event_id");

    CREATE INDEX "bazaar_posts_owner_idx"
      ON "bazaar_posts" USING btree ("owner_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "bazaar_posts";
    DROP TABLE IF EXISTS "bazaar_events";
    DROP TABLE IF EXISTS "auction_yards_auction_dates";
    DROP TABLE IF EXISTS "auction_yards";
    DROP TYPE IF EXISTS "public"."enum_bazaar_posts_status";
    DROP TYPE IF EXISTS "public"."enum_bazaar_events_status";
  `)
}