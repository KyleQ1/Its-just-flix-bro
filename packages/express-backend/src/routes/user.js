import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({ message: "Failed to create user" });
      }
      const user = new User({ email, password: hash });
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      await user.save();
      console.log("User created successfully", user);
      res.json({ message: "User created successfully", token: token });
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create user" });
  }
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid username or password" });
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res.status(404).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.json({ message: "Login successful", token: token });
  } catch (error) {
    res.status(500).json({ message: "Failed to login user" });
  }
});

const checkToken = (req, res, next) => {
  const header = req.headers["authorization"];

  if (typeof header !== "undefined") {
    const bearer = header.split(" ");
    const token = bearer[1];

    req.token = token;
    next(); // pass control to the next handler
  } else {
    res.sendStatus(403);
  }
};

router.get("/data", checkToken, async (req, res) => {
  jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
    if (err) {
      console.log(err);
      res.sendStatus(403);
    } else {
      console.log("Token is valid", authData);
      res.json({
        message: "Successful login",
        authData,
      });
    }
  });
});

router.delete("/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});

router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId)
      .populate("watchlist.movie")
      .populate("reviews.review");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to get user" });
  }
});

// Update Movie by ID Endpoint (PUT)
router.put("/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const updatedUserData = req.body;
    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    existingUser.email = updatedUserData.email || existingUser.email;
    existingUser.password = updatedUserData.password || existingUser.password;
    existingUser.watchlist =
      updatedUserData.watchlist || existingUser.watchlist;
    existingUser.reviews = updatedUserData.reviews || existingUser.reviews;

    const updatedUser = await existingUser.save();

    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
