CREATE TABLE "adoption" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"public_id" text NOT NULL,
	"dog_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"adopted_at" timestamp NOT NULL,
	"returned_at" timestamp,
	CONSTRAINT "adoption_public_id_unique" UNIQUE("public_id")
);
--> statement-breakpoint
ALTER TABLE "adoption" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "dog" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"public_id" text NOT NULL,
	"registered_at" timestamp NOT NULL,
	"status" text NOT NULL,
	"returned_at" timestamp,
	"name" varchar(50) NOT NULL,
	"image" text,
	"description" varchar(255) NOT NULL,
	"age" smallint NOT NULL,
	"gender" text NOT NULL,
	"breed" varchar(50) NOT NULL,
	CONSTRAINT "dog_public_id_unique" UNIQUE("public_id")
);
--> statement-breakpoint
ALTER TABLE "dog" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "profile" (
	"id" uuid PRIMARY KEY NOT NULL,
	"public_id" text NOT NULL,
	"email" varchar(100) NOT NULL,
	"confirmed" boolean DEFAULT false NOT NULL,
	"role" text DEFAULT 'user' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "profile_public_id_unique" UNIQUE("public_id"),
	CONSTRAINT "profile_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "profile" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "adoption" ADD CONSTRAINT "adoption_dog_id_dog_id_fk" FOREIGN KEY ("dog_id") REFERENCES "public"."dog"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "adoption" ADD CONSTRAINT "adoption_user_id_profile_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profile"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profile" ADD CONSTRAINT "profile_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;