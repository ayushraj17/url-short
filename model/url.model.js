import { integer, text, pgTable, varchar, uuid } from "drizzle-orm/pg-core";

export const urlTable = pgTable("urls", {
	id: uuid().primaryKey().notNull(),
	shorten: varchar().notNull(),
	url: varchar().notNull(),
	userId: integer().references(() => users.id),
});
