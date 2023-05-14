import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose, { mongo } from "mongoose";
import router from "./routes";
dotenv.config();

const app: Express = express();

app.use(cors({ credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}/`)
);

const MONGO_URL = process.env.DB_URL as string;
mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => console.log(error));
