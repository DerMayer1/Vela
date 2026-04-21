CREATE TABLE IF NOT EXISTS "tenants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"primary_color" text DEFAULT '#0A6EBD' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "tenants_slug_unique" ON "tenants" USING btree ("slug");
--> statement-breakpoint
INSERT INTO "tenants" ("slug", "name", "primary_color", "created_at", "updated_at")
VALUES ('vela', 'Vela Health', '#0A6EBD', NOW(), NOW())
ON CONFLICT ("slug") DO NOTHING;
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "tenant_id" uuid;
--> statement-breakpoint
UPDATE "users"
SET "tenant_id" = (
	SELECT "id"
	FROM "tenants"
	WHERE "slug" = 'vela'
	LIMIT 1
)
WHERE "tenant_id" IS NULL;
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "tenant_id" SET NOT NULL;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "patient_profiles" ADD COLUMN IF NOT EXISTS "tenant_id" uuid;
--> statement-breakpoint
UPDATE "patient_profiles"
SET "tenant_id" = "users"."tenant_id"
FROM "users"
WHERE "users"."id" = "patient_profiles"."user_id"
  AND "patient_profiles"."tenant_id" IS NULL;
--> statement-breakpoint
ALTER TABLE "patient_profiles" ALTER COLUMN "tenant_id" SET NOT NULL;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "patient_profiles" ADD CONSTRAINT "patient_profiles_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "consultations" ADD COLUMN IF NOT EXISTS "tenant_id" uuid;
--> statement-breakpoint
UPDATE "consultations"
SET "tenant_id" = "patient_profiles"."tenant_id"
FROM "patient_profiles"
WHERE "patient_profiles"."id" = "consultations"."patient_profile_id"
  AND "consultations"."tenant_id" IS NULL;
--> statement-breakpoint
ALTER TABLE "consultations" ALTER COLUMN "tenant_id" SET NOT NULL;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "consultations" ADD CONSTRAINT "consultations_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT IF EXISTS "users_email_unique";
--> statement-breakpoint
DROP INDEX IF EXISTS "users_email_unique";
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "users_tenant_email_unique" ON "users" USING btree ("tenant_id","email");
