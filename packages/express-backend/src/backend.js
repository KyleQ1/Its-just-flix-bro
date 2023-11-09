import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import movieRouter from "./routes/movie.js";
import reviewRouter from "./routes/review.js";
import userRouter from "./routes/user.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const connection_url =
  "mongodb+srv://newUser:newPassword@cluster0.g8i3gad.mongodb.net/FlixDB?retryWrites=true&w=majority";

mongoose
  .connect(connection_url, {
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to FlixDB"))
  .catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/movie", movieRouter);
app.use("/review", reviewRouter);
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
