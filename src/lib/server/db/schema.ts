import { relations } from 'drizzle-orm';
import { pgTable, uuid, smallint, text, varchar, timestamp, boolean } from 'drizzle-orm/pg-core';
import { authUsers } from 'drizzle-orm/supabase';

export const profile = pgTable('profile', {
	id: uuid('id')
		.primaryKey()
		.references(() => authUsers.id, { onDelete: 'cascade' }),
	publicId: text('public_id').notNull().unique(),
	email: varchar('email', { length: 100 }).notNull().unique(),
	confirmed: boolean('confirmed').notNull().default(false),
	role: text('role').notNull().default('user'),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
}).enableRLS();

export const profileRelation = relations(profile, ({ many }) => ({
	adoptions: many(adoption)
}));

export const dog = pgTable('dog', {
	id: uuid('id').primaryKey().defaultRandom(),
	publicId: text('public_id').notNull().unique(), //nanoid
	registeredAt: timestamp('registered_at').notNull(),
	status: text('status').notNull(),
	returnedAt: timestamp('returned_at'),
	name: varchar('name', { length: 50 }).notNull(),
	image: text('image'),
	description: varchar('description', { length: 255 }).notNull(),
	age: smallint('age').notNull(),
	gender: text('gender').notNull(),
	breed: varchar('breed', { length: 50 }).notNull()
}).enableRLS();

export const adoption = pgTable('adoption', {
	id: uuid('id').primaryKey().defaultRandom(),
	publicId: text('public_id').notNull().unique(),
	dogId: uuid('dog_id')
		.notNull()
		.references(() => dog.id, { onDelete: 'cascade' }),
	userId: uuid('user_id')
		.notNull()
		.references(() => profile.id, { onDelete: 'restrict' }),
	adoptedAt: timestamp('adopted_at').notNull(),
	returnedAt: timestamp('returned_at')
}).enableRLS();

export const adoptionRelation = relations(adoption, ({ one }) => ({
	dog: one(dog, {
		fields: [adoption.dogId],
		references: [dog.id]
	}),
	user: one(profile, {
		fields: [adoption.userId],
		references: [profile.id]
	})
}));

export type Dog = typeof dog.$inferSelect;
export type NewDog = typeof dog.$inferInsert;
export type User = typeof profile.$inferSelect;
export type NewUser = typeof profile.$inferInsert;
