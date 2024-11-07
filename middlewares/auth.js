import { getUser } from "../utils/tokenAssigning.js";

function authenticate(req, _, next) {
	req.user = null;
	let uid = req.cookies?.uid;
	if (uid) {
		let user = getUser(uid);
		if (user) req.user = user;
	}
	return next();
}

function authorize(roles = []) {
	return (req, res, next) => {
		if (!req.user) return res.redirect("/signin");
		if (!roles.includes(req.user.userRole)) return res.end("unAuthorized");
		return next();
	};
}

export { authenticate, authorize };
