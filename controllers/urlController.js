import { URL } from "../models/url.model.js";
import { nanoid } from "nanoid";

async function handleURLgenerate(req, res, next) {
	if (!req.user) return res.redirect("/signin");

	try {
		let newURL = await URL.create({
			shortURL: nanoid(6),
			redirectURL: req.body.redirectURL,
			URLvisits: [],
			generatedBy: req.user._id,
		});

		if (newURL) return res.redirect("/url/create_page");
		else return res.end("Invalid URL");
	} catch (error) {
		console.log("Error in URL generation", error);
	}
}

async function handleURLvisit(req, res) {
	let shortURL = req.params.urlID;
	let visitedURL = await URL.findOneAndUpdate(
		{ shortURL },
		{
			$push: {
				URLvisits: {
					visitTime: Date.now(),
				},
			},
		},
	);

	res.redirect(visitedURL.redirectURL);
}

async function handleURLCreateLastURL(req, res) {
	if (!req.user) return res.redirect("/signin");

	let url_obj = await URL.findOne({ generatedBy: req.user._id }).sort({
		_id: -1,
	});
	res.render("create_page", {
		urlID: url_obj ? url_obj.shortURL : "",
		signin: req.user.isUserLoggedin,
	});
}

async function handleURLread(req, res) {
	let urls = await URL.find({ generatedBy: req.user._id });
	res.render("read_page", {
		urls,
		signin: req.user.isUserLoggedin,
	});
}

export {
	handleURLgenerate,
	handleURLvisit,
	handleURLread,
	handleURLCreateLastURL,
};
