import express from "express";
import cors from "cors";
import mongoose from "mongoose";

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
