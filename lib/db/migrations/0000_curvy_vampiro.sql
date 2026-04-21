CREATE TYPE "public"."consultation_status" AS ENUM('scheduled', 'in-progress', 'completed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."gender" AS ENUM('male', 'female', 'other', 'prefer-not-to-say');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "consultations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"patient_profile_id" uuid NOT NULL,
	"status" "consultation_status" DEFAULT 'scheduled' NOT NULL,
	"specialty" text NOT NULL,
	"physician_name" text NOT NULL,
	"scheduled_at" timestamp with time zone NOT NULL,
	"chief_complaint" text NOT NULL,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "patient_profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"date_of_birth" text,
	"gender" "gender",
	"phone" text,
	"chief_complaint" text,
	"symptom_duration" text,
	"symptom_severity" text,
	"conditions" text[] DEFAULT '{}'::text[] NOT NULL,
	"medications" text[] DEFAULT '{}'::text[] NOT NULL,
	"allergies" text[] DEFAULT '{}'::text[] NOT NULL,
	"has_recent_surgery" boolean DEFAULT false NOT NULL,
	"onboarding_completed" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "patient_profiles_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "consultations" ADD CONSTRAINT "consultations_patient_profile_id_patient_profiles_id_fk" FOREIGN KEY ("patient_profile_id") REFERENCES "public"."patient_profiles"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "patient_profiles" ADD CONSTRAINT "patient_profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
