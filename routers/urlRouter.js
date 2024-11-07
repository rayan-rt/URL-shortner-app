import express from "express";
import {
	handleURLgenerate,
	handleURLvisit,
	handleURLread,
	handleURLCreateLastURL,
} from "../controllers/urlController.js";
import { authorize } from "../middlewares/auth.js";

export const router = express.Router();

router
	.route("/")
	.get((_, res) => res.redirect("/url/read_page"))
	.post(handleURLgenerate);

router.get("/create_page", handleURLCreateLastURL);

router.get("/read_page", authorize(["ADMIN", "USER"]), handleURLread);

router.get("/:urlID", handleURLvisit);
