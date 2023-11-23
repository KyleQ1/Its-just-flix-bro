import express from "express";
import Review from "../models/review.js";
import Movie from "../models/movie.js";
import User from "../models/user.js";

const router = express.Router();

// Create Review Endpoint (POST)
router.post("/", async (req, res) => {
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

    const savedReview = await review.save();

    // Update movie and user documents with the new review ID
    movie.reviews.push(savedReview._id);
    user.reviews.push(savedReview._id);

    await Promise.all([movie.save(), user.save()]);

    res.status(201).json(savedReview);
  } catch (error) {
    res.status(500).json({ error: "Failed to create review" });
  }
});

// Delete Review Endpoint (DELETE)
router.delete("/:reviewId", async (req, res) => {
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
router.get("/:reviewId", async (req, res) => {
  const reviewId = req.params.reviewId;
  try {
    const review = await Review.findById(reviewId)
      .populate("movie")
      .populate("user");
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: "Failed to get review" });
  }
});

// Update Review by ID Endpoint (PUT)
router.put("/:reviewId", async (req, res) => {
  const reviewId = req.params.reviewId;
  try {
    const updatedReviewData = req.body;
    const existingReview = await Review.findById(reviewId);

    if (!existingReview) {
      return res.status(404).json({ error: "Review not found" });
    }

    existingReview.movie = updatedReviewData.movie || existingReview.movie;
    existingReview.user = updatedReviewData.user || existingReview.user;
    existingReview.reviewText =
      updatedReviewData.reviewText || existingReview.reviewText;
    existingReview.reviewTitle =
      updatedReviewData.reviewTitle || existingReview.reviewTitle;
    existingReview.rating = updatedReviewData.rating || existingReview.rating;

    const updatedReview = await existingReview.save();

    res.status(200).json(updatedReview);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
