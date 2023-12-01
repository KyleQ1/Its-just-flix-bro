import express from "express";
import Review from "../models/review.js";
import Movie from "../models/movie.js";
import User from "../models/user.js";

const router = express.Router();

// Create Review Endpoint (POST)
router.post("/", async (req, res) => {
  try {
    const review = await Review.createReview(req.body);
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Review Endpoint (DELETE)
router.delete("/:reviewId", async (req, res) => {
  const reviewId = req.params.reviewId;
  try {
    const result = await Review.deleteReview(reviewId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Review Endpoint (GET)
router.get("/:reviewId", async (req, res) => {
  const reviewId = req.params.reviewId;
  try {
    const review = await Review.getReviewById(reviewId);
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Review by ID Endpoint (PUT)
router.put("/:reviewId", async (req, res) => {
  const reviewId = req.params.reviewId;
  try {
    const updatedReview = await Review.updateReviewById(reviewId, req.body);
    res.status(200).json(updatedReview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
