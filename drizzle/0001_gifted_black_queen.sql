PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_adoptions` (
	`id` text PRIMARY KEY NOT NULL,
	`dog_id` text NOT NULL,
	`user_id` text NOT NULL,
	`adopted_at` integer NOT NULL,
	`returned_at` integer
);
--> statement-breakpoint
INSERT INTO `__new_adoptions`("id", "dog_id", "user_id", "adopted_at", "returned_at") SELECT "id", "dog_id", "user_id", "adopted_at", "returned_at" FROM `adoptions`;--> statement-breakpoint
DROP TABLE `adoptions`;--> statement-breakpoint
ALTER TABLE `__new_adoptions` RENAME TO `adoptions`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_dog` (
	`id` text PRIMARY KEY NOT NULL,
	`registered_at` integer NOT NULL,
	`status` text NOT NULL,
	`adopted_by` text,
	`returned_at` integer,
	`name` text NOT NULL,
	`age` integer NOT NULL,
	`breed` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_dog`("id", "registered_at", "status", "adopted_by", "returned_at", "name", "age", "breed") SELECT "id", "registered_at", "status", "adopted_by", "returned_at", "name", "age", "breed" FROM `dog`;--> statement-breakpoint
DROP TABLE `dog`;--> statement-breakpoint
ALTER TABLE `__new_dog` RENAME TO `dog`;--> statement-breakpoint
CREATE TABLE `__new_user` (
	`id` text PRIMARY KEY NOT NULL,
	`registered_at` integer NOT NULL,
	`username` text NOT NULL,
	`passwordHash` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_user`("id", "registered_at", "username", "passwordHash") SELECT "id", "registered_at", "username", "passwordHash" FROM `user`;--> statement-breakpoint
DROP TABLE `user`;--> statement-breakpoint
ALTER TABLE `__new_user` RENAME TO `user`;