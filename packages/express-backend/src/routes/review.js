import express from "express";
import Review from "../models/review.js"; 
import Movie from "../models/movie.js"; 
import User from "../models/user.js"; 

const router = express.Router();

// Create Review Endpoint (POST)
router.post("/reviews", async (req, res) => {
  try {
    const { movieId, userId, reviewText, reviewTitle, rating } = req.body;
    
    // Check if movie and user exist
    const movie = await Movie.findById(movieId);
    const user = await User.findById(userId);

    if (!movie || !user) {
      return res.status(404).json({ error: "Movie or user not found" });
    }

    const review = new Review({
      movie: movieId,
      user: userId,
      reviewText,
      reviewTitle,
      rating,
    });

    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: "Failed to create review" });
  }
});

// Delete Review Endpoint (DELETE)
router.delete("/reviews/:reviewId", async (req, res) => {
  const reviewId = req.params.reviewId;
  try {
    const review = await Review.findByIdAndDelete(reviewId);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete review" });
  }
});

// Get Review Endpoint (GET)
router.get("/reviews/:reviewId", async (req, res) => {
  const reviewId = req.params.reviewId;
  try {
    const review = await Review.findById(reviewId).populate("movie").populate("user");
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: "Failed to get review" });
  }
});

export default router;
