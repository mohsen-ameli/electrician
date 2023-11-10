CREATE TABLE IF NOT EXISTS "admin" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(256) NOT NULL,
	"password" varchar(256) NOT NULL,
	CONSTRAINT "admin_username_unique" UNIQUE("username")
);
