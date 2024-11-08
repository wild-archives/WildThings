CREATE TABLE IF NOT EXISTS "archives" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "archives_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"user_id" integer,
	"is_verified" boolean DEFAULT false,
	"visibility" "visibility_enum" DEFAULT 'public',
	"password" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"avatar" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "files" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "files_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" integer NOT NULL,
	"file_key" varchar(255) NOT NULL,
	"file_name" varchar(255) NOT NULL,
	"file_size" numeric NOT NULL,
	"content_type" varchar(100) NOT NULL,
	"uploaded_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "extra_attribute_keys" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "extra_attribute_keys_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"attribute_key" varchar(50) NOT NULL,
	"description" text,
	"type" "attribute_types" NOT NULL,
	"category" "attribute_category" NOT NULL,
	"is_public" boolean DEFAULT false NOT NULL,
	CONSTRAINT "extra_attribute_keys_attribute_key_unique" UNIQUE("attribute_key")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "extra_attribute_values" (
	"user_id" integer NOT NULL,
	"extra_key_id" integer NOT NULL,
	"value_type" "attribute_types" NOT NULL,
	"value_text" text,
	"value_number" numeric,
	"value_switch" boolean,
	"value_date" date,
	"value_time" time,
	"value_datetime" timestamp,
	"value_file" integer,
	"user_is_public" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"nickname" varchar(255),
	"email" varchar(255) NOT NULL,
	"avatar" integer,
	"banner" integer,
	"bio" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"last_seen_at" timestamp,
	"role" "user_roles" DEFAULT 'user' NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "archives" ADD CONSTRAINT "archives_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "archives" ADD CONSTRAINT "archives_avatar_files_id_fk" FOREIGN KEY ("avatar") REFERENCES "public"."files"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "files" ADD CONSTRAINT "files_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "extra_attribute_values" ADD CONSTRAINT "extra_attribute_values_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "extra_attribute_values" ADD CONSTRAINT "extra_attribute_values_extra_key_id_extra_attribute_keys_id_fk" FOREIGN KEY ("extra_key_id") REFERENCES "public"."extra_attribute_keys"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "extra_attribute_values" ADD CONSTRAINT "extra_attribute_values_value_file_files_id_fk" FOREIGN KEY ("value_file") REFERENCES "public"."files"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
