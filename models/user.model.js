import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	userName: {
		type: String,
		required: true,
	},
	userEmail: {
		type: String,
		required: true,
		unique: true,
	},
	userPassword: {
		type: String,
		required: true,
	},
	userRole: {
		type: String,
		enums: ["ADMIN", "USER"],
		default: "USER",
	},
	isUserLoggedin: {
		type: Boolean,
		default: false,
	},
});

export let User = mongoose.model("User", userSchema);
