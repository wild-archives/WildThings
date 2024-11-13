import { pgTable, text, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { users } from "./user.ts";

export const sessions = pgTable("sessions", {
	id: text("id").primaryKey(),
	expires_at: timestamp('expires_at').notNull(),
	ip_address: text('ip_address'),
	user_agent: text('user_agent'),
	user_id: text('user_id').notNull().references(() => users.id)
});

export const accounts = pgTable("accounts", {
	id: text("id").primaryKey(),
	account_id: text('account_id').notNull(),
	provider_id: text('provider_id').notNull(),
	user_id: text('user_id').notNull().references(() => users.id),
	access_token: text('access_token'),
	refresh_token: text('refresh_token'),
	id_token: text('id_token'),
	expires_at: timestamp('expires_at'),
	password: text('password')
});

export const verifications = pgTable("verifications", {
	id: text("id").primaryKey(),
	identifier: text('identifier').notNull(),
	value: text('value').notNull(),
	expires_at: timestamp('expires_at').notNull()
});
