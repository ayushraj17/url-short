import { integer, text, pgTable, varchar, uuid } from "drizzle-orm/pg-core";
import { usersTable } from "./user.model.js";

export const urlsTable = pgTable("urls", {
	id: uuid().primaryKey().notNull(),
	shorten: varchar().notNull(),
	url: varchar().notNull(),
	userId: integer().references(() => usersTable.id),
});
