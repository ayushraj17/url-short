import express from "express";
import authRouter from "./router/auth.router.js";
import urlRouter from "./router/url.router.js";
const app = express();
const port = 3000;

app.use(express.json());
app.use("/auth", authRouter);
app.use(urlRouter);
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
