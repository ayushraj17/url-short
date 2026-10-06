import "dotenv/config";
import jwt from "jsonwebtoken";

export const generateAuthToken = (id = "") => {
	const token = jwt.sign({ id }, process.env.JWT_SECRET);
	return token;
};
