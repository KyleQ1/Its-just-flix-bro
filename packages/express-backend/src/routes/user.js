import express from "express";
import User from "../models/user.js"; 
const router = express.Router();

router.post("/users", async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = new User({ username, password });
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to create user" });
    }
  });

  router.delete("/users/:userId", async (req, res) => {
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

  router.get("/users/:userId", async (req, res) => {
    const userId = req.params.userId;
    try {
      const user = await User.findById(userId).populate("watchlist.movie").populate("reviews.review");
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to get user" });
    }
  });
export default router;