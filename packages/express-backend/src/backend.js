import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import movieRouter from "./routes/movie.js";
import reviewRouter from "./routes/review.js";
import userRouter from "./routes/user.js";
import dotenv from "dotenv";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const result = dotenv.config({ path: ".env.local" });
if (result.error) {
  console.error("Error loading .env.local file:", result.error);
}

const envError = (environment) => {
  console.error("Error loading " + environment + " variable from .env.local file:", result.error);
  process.exit(1);
}

const connection_url = process.env.MONGO_URI;
if (!connection_url) {
  envError("MONGO_URI");
}

if (!process.env.JWT_SECRET) {
  envError("JWT_SECRET");
}

if (!process.env.PORT) {
  envError("PORT");
}

mongoose
  .connect(connection_url, {
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to FlixDB"))
  .catch((error) => console.log(error, connection_url));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/movie", movieRouter);
app.use("/review", reviewRouter);
app.use("/user", userRouter);

app.listen(process.env.PORT || port, () => {
  console.log(`Flix API listening.`);
});
