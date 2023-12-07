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

const result = dotenv.config();

const connection_url = process.env.MONGO_URI;

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
