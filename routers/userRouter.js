import express from "express";
import {
	handleSignIn,
	handleSignOut,
	handleSignUp,
} from "../controllers/userController.js";

export const router = express.Router();

router.post("/signup", handleSignUp);
router.post("/signin", handleSignIn);
router.post("/signout", handleSignOut);
