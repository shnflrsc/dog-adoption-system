CREATE TABLE `adoptions` (
	`id` text PRIMARY KEY NOT NULL,
	`dog_id` text NOT NULL,
	`user_id` text NOT NULL,
	`adopted_at` text NOT NULL,
	`returned_at` text
);
--> statement-breakpoint
CREATE TABLE `dog` (
	`id` text PRIMARY KEY NOT NULL,
	`registered_at` text NOT NULL,
	`status` text NOT NULL,
	`adopted_by` text,
	`returned_at` text,
	`name` text NOT NULL,
	`age` integer NOT NULL,
	`breed` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`registered_at` text NOT NULL,
	`username` text NOT NULL,
	`passwordHash` text NOT NULL
);
