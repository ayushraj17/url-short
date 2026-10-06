import express from "express";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated.js";
import { validateBody } from "../middleware/validateBody.js";
import { urlShortenRequestSchema } from "../validations/request.validator.js";
const urlRouter = express.Router();

urlRouter.post(
	"/shorten",
	ensureAuthenticated,
	validateBody(urlShortenRequestSchema),
	(req, res) => {
		console.log(req);
		return res.status(200).json(req.body);
	},
);

export default urlRouter;
