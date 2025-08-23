import { relations } from 'drizzle-orm';
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const dog = sqliteTable('dog', {
	id: text('id').primaryKey(),
	registeredAt: integer('registered_at').notNull(),
	status: text('status').notNull(),
	adoptedBy: text('adopted_by'),
	returnedAt: integer('returned_at'),
	name: text('name').notNull(),
	age: integer('age').notNull(),
	breed: text('breed').notNull()
});

export const dogRelation = relations(dog, ({ one }) => ({
	adopter: one(user, {
		fields: [dog.adoptedBy],
		references: [user.id]
	})
}));

export const adoption = sqliteTable('adoptions', {
	id: text('id').primaryKey(),
	dogId: text('dog_id').notNull(),
	userId: text('user_id').notNull(),
	adoptedAt: integer('adopted_at').notNull(),
	returnedAt: integer('returned_at')
});

export const adoptionRelation = relations(adoption, ({ one }) => ({
	dog: one(dog, {
		fields: [adoption.dogId],
		references: [dog.id]
	}),
	user: one(user, {
		fields: [adoption.userId],
		references: [user.id]
	})
}));

export const user = sqliteTable('user', {
	id: text('id').primaryKey(),
	registeredAt: integer('registered_at').notNull(),
	username: text('username').notNull(),
	passwordHash: text('passwordHash').notNull()
});

export const userRelation = relations(user, ({ many }) => ({
	adopted: many(dog)
}));

export const session = sqliteTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});

export type Dog = typeof dog.$inferSelect;
export type NewDog = typeof dog.$inferInsert;
export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;
export type Session = typeof session.$inferSelect;
