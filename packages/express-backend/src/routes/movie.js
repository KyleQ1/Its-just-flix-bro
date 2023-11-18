import express from "express";
import Movie from "../models/movie.js"; // Adjust the path based on your project structure
import Review from "../models/review.js"; // Import the Review model if it's not already imported

const router = express.Router();

// Create Movie Endpoint (POST)
router.post("/", async (req, res) => {
  try {
    const { title, description, image, genres, popularity, releaseDate } =
      req.body;
    const movie = new Movie({
      title,
      description,
      image,
      genres,
      popularity,
      releaseDate,
    });
    await movie.save();
    console.log("Success posted movie: ", req.body);
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ error: "Failed to create movie" });
  }
});

// Delete Movie Endpoint (DELETE)
router.delete("/:movieId", async (req, res) => {
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
router.get("/:movieId", async (req, res) => {
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

// Get movies by genre (GET)
router.get("/genre/:genre", async (req, res) => {
  try {
    const genre = req.params.genre;

    // Find movies with the specified genre
    const movies = await Movie.find({ genres: genre });

    if (movies.length === 0) {
      return res.status(404).json({ message: "No movies found for the specified genre." });
    }

    res.json(movies);
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
export default router;
