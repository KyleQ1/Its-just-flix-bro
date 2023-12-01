import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const result = await User.createUser(req.body);
    res.json(result);
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
