import { eq } from "drizzle-orm";
import express from "express";
import db from "../db/index.js";
import { validateBody } from "../middleware/validateBody.js";
import { usersTable } from "../model/user.model.js";
import { createHashedPassword } from "../utils/hash.js";
import { generateAuthToken } from "../utils/token.js";
import {
	userAuthLoginRequestSchema,
	userAuthSignupRequestSchema,
} from "../validations/request.validator.js";

const authRouter = express.Router();

authRouter.post(
	"/login",
	validateBody(userAuthLoginRequestSchema),
	async (req, res) => {
		const { email, password } = req.body;
		try {
			const [user] = await db
				.select({
					id: usersTable.id,
					email: usersTable.email,
					password: usersTable.password,
					salt: usersTable.salt,
				})
				.from(usersTable)
				.where(eq(usersTable.email, email));

			if (!user) {
				return res
					.status(400)
					.json({ error: `Unable to find user with ${email}` });
			}
			const [hashedPassword] = createHashedPassword(password, user.salt);
			if (hashedPassword !== user.password) {
				return res
					.status(400)
					.json({ error: `Either the email or password is incorrect` });
			}
			const token = generateAuthToken(user.id);
			return res.status(200).json({ token });
		} catch (error) {
			console.error(error);
			return res.status(400).json(error);
		}
	},
);

authRouter.post(
	"/signup",
	validateBody(userAuthSignupRequestSchema),
	async (req, res) => {
		try {
			const { name, email, password } = req.body;
			const [hashedPassword, salt] = createHashedPassword(password);
			const [user] = await db
				.insert(usersTable)
				.values({ name, email, password, salt, password: hashedPassword })
				.returning({ id: usersTable.id });
			const token = generateAuthToken(user.id);
			return res.status(200).json({ token, id: user.id });
		} catch (error) {
			console.error(error);
			return res.status(400).json(error);
		}
	},
);

export default authRouter;
