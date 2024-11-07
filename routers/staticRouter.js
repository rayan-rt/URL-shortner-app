import express from "express";

export const router = express.Router();

let isSignin;
router.get("/", (req, res) => {
	isSignin = req.user ? req.user.isUserLoggedin : false;
	res.render("index", { signin: isSignin });
});

router.get("/signin", (req, res) => {
	if (req.user) res.redirect("/");
	else res.render("signin", { signin: isSignin });
});

router.get("/signup", (req, res) => {
	if (req.user) res.redirect("/");
	else res.render("signup", { signin: isSignin });
});
