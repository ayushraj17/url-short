import {
	integer,
	text,
	pgTable,
	varchar,
	uuid,
	timestamp,
} from "drizzle-orm/pg-core";
import { usersTable } from "./user.model.js";

export const urlsTable = pgTable("urls", {
	id: uuid().primaryKey().defaultRandom(),
	shorten: varchar().notNull(),
	url: varchar().notNull(),
	userId: integer().references(() => usersTable.id),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});
