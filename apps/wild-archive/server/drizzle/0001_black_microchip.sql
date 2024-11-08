ALTER TYPE "public"."attribute_category" RENAME TO "user_attribute_category";--> statement-breakpoint
ALTER TABLE "extra_attribute_keys" RENAME TO "user_extra_attribute_keys";--> statement-breakpoint
ALTER TABLE "extra_attribute_values" RENAME TO "user_extra_attribute_values";--> statement-breakpoint
ALTER TABLE "user_extra_attribute_keys" DROP CONSTRAINT "extra_attribute_keys_attribute_key_unique";--> statement-breakpoint
ALTER TABLE "user_extra_attribute_values" DROP CONSTRAINT "extra_attribute_values_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "user_extra_attribute_values" DROP CONSTRAINT "extra_attribute_values_extra_key_id_extra_attribute_keys_id_fk";
--> statement-breakpoint
ALTER TABLE "user_extra_attribute_values" DROP CONSTRAINT "extra_attribute_values_value_file_files_id_fk";
--> statement-breakpoint
ALTER TABLE "user_extra_attribute_values" ADD COLUMN "value" jsonb;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_extra_attribute_values" ADD CONSTRAINT "user_extra_attribute_values_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_extra_attribute_values" ADD CONSTRAINT "user_extra_attribute_values_extra_key_id_user_extra_attribute_keys_id_fk" FOREIGN KEY ("extra_key_id") REFERENCES "public"."user_extra_attribute_keys"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "user_extra_attribute_values" DROP COLUMN IF EXISTS "value_type";--> statement-breakpoint
ALTER TABLE "user_extra_attribute_values" DROP COLUMN IF EXISTS "value_text";--> statement-breakpoint
ALTER TABLE "user_extra_attribute_values" DROP COLUMN IF EXISTS "value_number";--> statement-breakpoint
ALTER TABLE "user_extra_attribute_values" DROP COLUMN IF EXISTS "value_switch";--> statement-breakpoint
ALTER TABLE "user_extra_attribute_values" DROP COLUMN IF EXISTS "value_date";--> statement-breakpoint
ALTER TABLE "user_extra_attribute_values" DROP COLUMN IF EXISTS "value_time";--> statement-breakpoint
ALTER TABLE "user_extra_attribute_values" DROP COLUMN IF EXISTS "value_datetime";--> statement-breakpoint
ALTER TABLE "user_extra_attribute_values" DROP COLUMN IF EXISTS "value_file";--> statement-breakpoint
ALTER TABLE "user_extra_attribute_keys" ADD CONSTRAINT "user_extra_attribute_keys_attribute_key_unique" UNIQUE("attribute_key");