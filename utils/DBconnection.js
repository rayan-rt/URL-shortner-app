import mongoose from "mongoose";

export async function DBconnection(DB_URL, DB_NAME) {
	try {
		console.log("DB connecting...");
		await mongoose.connect(`mongodb://${DB_URL}/${DB_NAME}`);
		console.log("DB connected");
	} catch (error) {
		console.log("DB connection error", error);
	}
}
