import dotenv from "dotenv";

import express from "express";
import { DBconnection } from "./utils/DBconnection.js";

import { fileURLToPath } from "url";
import path from "path";

import cookieParser from "cookie-parser";

import { router as staticRouter } from "./routers/staticRouter.js";
import { router as urlRouter } from "./routers/urlRouter.js";
import { router as userRouter } from "./routers/userRouter.js";
import { authenticate } from "./middlewares/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// DB
DBconnection();

// file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// settings
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// middlewares
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(authenticate);

// routes
app.use("/", staticRouter);
app.use("/url", urlRouter);
app.use("/user", userRouter);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
