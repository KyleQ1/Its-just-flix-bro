import express from "express";
import Movie from "../models/movie.js"; // Adjust the path based on your project structure
import Review from "../models/review.js"; // Import the Review model if it's not already imported

const router = express.Router();

// Create Movie Endpoint (POST)
router.post("/movies", async (req, res) => {
  try {
    const { title, description, image, genres } = req.body;
    const movie = new Movie({ title, description, image, genres });
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ error: "Failed to create movie" });
  }
});

// Delete Movie Endpoint (DELETE)
router.delete("/movies/:movieId", async (req, res) => {
  const movieId = req.params.movieId;
  try {
    const movie = await Movie.findByIdAndDelete(movieId);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    // Delete associated reviews
    await Review.deleteMany({ movie: movieId });
    res.json({ message: "Movie and associated reviews deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete movie" });
  }
});

// Get Movie Endpoint (GET)
router.get("/movies/:movieId", async (req, res) => {
  const movieId = req.params.movieId;
  try {
    const movie = await Movie.findById(movieId).populate("reviews.review");
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: "Failed to get movie" });
  }
});

export default router;
