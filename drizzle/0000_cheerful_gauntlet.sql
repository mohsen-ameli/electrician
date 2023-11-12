CREATE TABLE IF NOT EXISTS "admin" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(256) NOT NULL,
	"password" varchar(256) NOT NULL,
	CONSTRAINT "admin_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "blogs" (
	"slug" varchar(256) PRIMARY KEY NOT NULL,
	"date" bigint NOT NULL,
	"name" text NOT NULL,
	"content" text NOT NULL,
	CONSTRAINT "blogs_slug_unique" UNIQUE("slug"),
	CONSTRAINT "blogs_name_unique" UNIQUE("name")
);
