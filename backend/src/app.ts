import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import usersRoutes from "./routes/users.routes.js";
import booksRoutes from "./routes/books.routes.js";
import reviewsRoutes from "./routes/reviews.routes.js";
import { APIResponse } from "./utils/APIResponse.js";

dotenv.config();

const app = express();

const corsOptions = {
  credentials: true,
  origin: process.env.ORIGIN,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res) => {
  res.status(200).send(new APIResponse(200, null, "server is running"));
});

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/users", usersRoutes);

app.use("/api/v1/books", booksRoutes);

app.use("/api/v1/reviews", reviewsRoutes);

export default app;
