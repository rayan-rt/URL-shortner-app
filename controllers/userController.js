import { User } from "../models/user.model.js";
import { getToken } from "../utils/tokenAssigning.js";

async function handleSignUp(req, res) {
	try {
		let { userName, userEmail, userPassword } = req.body;
		let newUser = await User.create({
			userName,
			userEmail,
			userPassword,
			isUserLoggedin: true,
		});
		if (newUser) {
			// token
			const token = getToken(newUser);
			// cookie
			res.cookie("uid", token);
			res.redirect("/url/create_page");
		} else res.redirect("/signup");
	} catch (error) {
		console.log("Error in signup:", error);
	}
}

async function handleSignIn(req, res) {
	try {
		let { userEmail, userPassword } = req.body;
		let loggedinUser = await User.findOne({ userEmail, userPassword });
		if (loggedinUser) {
			// token
			const token = getToken(loggedinUser);
			// cookie
			res.cookie("uid", token);
			res.redirect("/url/create_page");
		} else res.redirect("/signin");
	} catch (error) {
		console.log("Error in signin:", error);
	}
}

async function handleSignOut(req, res) {
	let loggedin_user = await User.findById(req.user._id);
	loggedin_user.isUserLoggedin = !loggedin_user.isUserLoggedin;
	res.clearCookie("uid");
	res.redirect("/");
}

export { handleSignUp, handleSignIn, handleSignOut };
