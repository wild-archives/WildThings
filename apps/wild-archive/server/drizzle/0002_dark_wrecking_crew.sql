CREATE TYPE "public"."archive_attribute_category" AS ENUM('species', 'personality');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "archive_extra_attribute_keys" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "archive_extra_attribute_keys_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"attribute_key" varchar(50) NOT NULL,
	"description" text,
	"type" "attribute_types" NOT NULL,
	"species" "archive_attribute_category" NOT NULL,
	"is_public" boolean DEFAULT false NOT NULL,
	CONSTRAINT "archive_extra_attribute_keys_attribute_key_unique" UNIQUE("attribute_key")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "archive_extra_attribute_values" (
	"archive_id" integer NOT NULL,
	"extra_key_id" integer NOT NULL,
	"value" jsonb,
	"user_is_public" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "archive_extra_attribute_values" ADD CONSTRAINT "archive_extra_attribute_values_archive_id_archives_id_fk" FOREIGN KEY ("archive_id") REFERENCES "public"."archives"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "archive_extra_attribute_values" ADD CONSTRAINT "archive_extra_attribute_values_extra_key_id_archive_extra_attribute_keys_id_fk" FOREIGN KEY ("extra_key_id") REFERENCES "public"."archive_extra_attribute_keys"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
