import mongoose from "mongoose";

export async function DBconnection() {
  try {
    console.log("DB connecting...");
    await mongoose.connect(String(process.env.MONGODB_URI));
    console.log("DB connected");
  } catch (error) {
    console.log("DB connection error", error);
  }
}
