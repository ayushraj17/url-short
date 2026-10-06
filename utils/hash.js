import crypto from "crypto";

export const createHashedPassword = (password = "", userSalt = "") => {
	const salt = userSalt ?? crypto.randomBytes(256).toString("hex");
	const hashedPassword = crypto
		.createHmac("sha256", salt)
		.update(password)
		.digest("hex");

	return [hashedPassword, salt];
};
