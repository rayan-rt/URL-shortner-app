import mongoose, { Schema } from "mongoose";

const urlSchema = new Schema({
	shortURL: {
		type: String,
		unique: true,
	},
	redirectURL: {
		type: String,
		required: true,
	},
	URLvisits: [
		{
			visitTime: Number,
		},
	],
	generatedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
});

export let URL = mongoose.model("URL", urlSchema);
