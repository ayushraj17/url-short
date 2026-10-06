import express from "express";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated.js";
import { validateBody } from "../middleware/validateBody.js";
import { urlShortenRequestSchema } from "../validations/request.validator.js";
import { nanoid } from "nanoid";
import { urlsTable } from "../model/url.model.js";
const urlRouter = express.Router();
import db from "../db/index.js";
import { eq, and } from "drizzle-orm";

urlRouter.get("/urls", ensureAuthenticated, async (req, res) => {
	const urls = await db
		.select({
			url: urlsTable.url,
			shorten: urlsTable.shorten,
		})
		.from(urlsTable)
		.where(eq(urlsTable.userId, req.user.id));
	return res.status(200).json(urls);
});

urlRouter.post(
	"/shorten",
	ensureAuthenticated,
	validateBody(urlShortenRequestSchema),
	async (req, res) => {
		const shorten = nanoid(6);
		const [shortenUrl] = await db
			.insert(urlsTable)
			.values({
				userId: req.user.id,
				shorten,
				url: req.body.url,
			})
			.returning({ shorten: urlsTable.shorten, url: urlsTable.url });
		return res.status(200).json(shortenUrl);
	},
);

urlRouter.delete("/:shortCode", ensureAuthenticated, async (req, res) => {
	const shortenUrl = await db
		.delete(urlsTable)
		.where(
			and(
				eq(urlsTable.shorten, req.params.shortCode),
				eq(urlsTable.userId, req.user.id),
			),
		);

	return res.status(201).json({ message: "url deleted" });
});

urlRouter.get("/:shortCode", async (req, res) => {
	const [shortenUrl] = await db
		.select({
			shorten: urlsTable.shorten,
			url: urlsTable.url,
		})
		.from(urlsTable)
		.where(eq(urlsTable.shorten, req.params.shortCode));

	return res.redirect(shortenUrl.url);
});

export default urlRouter;
