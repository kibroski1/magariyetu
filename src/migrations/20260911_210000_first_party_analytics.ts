import { sql, type MigrateDownArgs, type MigrateUpArgs } from '@payloadcms/db-postgres'

// Consent-aware first-party analytics events. No personal data or IP address
// is stored in this table; visitor_key is a one-way server hash.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TYPE "public"."enum_analytics_events_event_type" AS ENUM('page-view', 'search', 'listing-view', 'whatsapp-lead', 'sell-started', 'listing-submitted');
    CREATE TABLE "analytics_events" (
      "id" serial PRIMARY KEY NOT NULL,
      "event_type" "enum_analytics_events_event_type" NOT NULL,
      "path" varchar NOT NULL,
      "visitor_key" varchar NOT NULL,
      "occurred_at" timestamp(3) with time zone NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
    CREATE INDEX "analytics_events_event_type_idx" ON "analytics_events" USING btree ("event_type");
    CREATE INDEX "analytics_events_path_idx" ON "analytics_events" USING btree ("path");
    CREATE INDEX "analytics_events_visitor_key_idx" ON "analytics_events" USING btree ("visitor_key");
    CREATE INDEX "analytics_events_occurred_at_idx" ON "analytics_events" USING btree ("occurred_at");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "analytics_events";
    DROP TYPE IF EXISTS "public"."enum_analytics_events_event_type";
  `)
}
