import z from "zod";

export const userAuthSignupRequestSchema = z.object({
	name: z.string(),
	email: z.email(),
	password: z.string().min(3),
});

export const userAuthLoginRequestSchema = z.object({
	email: z.email(),
	password: z.string().min(3),
});

export const urlShortenRequestSchema = z.object({
	url: z.url().nonempty(),
	shorten: z.string().optional(),
});
