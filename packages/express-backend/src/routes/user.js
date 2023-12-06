import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
<<<<<<< HEAD
    const result = await User.createUser(req.body);
    res.json(result);
=======
    console.log(req.body);
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({ message: "Failed to create user" });
      }
      const user = new User({ email: email, password: hash });
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      await user.save();
      console.log("User created successfully", user);
      res.json({ message: "User created successfully", token: token });
    });
>>>>>>> origin/main
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const result = await User.loginUser(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
  const secretKey = process.env.JWT_SECRET;

  if (!secretKey) {
    return res.status(500).json({ error: "Internal Server Error: JWT_SECRET not defined" });
  }

  jwt.verify(req.token, secretKey, (err, authData) => {
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

export default router;
