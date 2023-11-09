CREATE TABLE `blogs` (
	`id` integer PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`date` integer DEFAULT 1699495839411 NOT NULL,
	`name` text NOT NULL,
	`content` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `blogs_slug_unique` ON `blogs` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `blogs_name_unique` ON `blogs` (`name`);