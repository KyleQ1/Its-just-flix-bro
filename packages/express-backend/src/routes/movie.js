import express from "express";
import Movie from "../models/movie.js";
import Review from "../models/review.js";

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
router.delete("/id/:movieId", async (req, res) => {
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
router.get("/id/:movieId", async (req, res) => {
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

// Update Movie by ID Endpoint (PUT)
router.put("/:movieId", async (req, res) => {
  const movieId = req.params.movieId;
  try {
    const updatedMovieData = req.body;
    const existingMovie = await Movie.findById(movieId);

    if (!existingMovie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    existingMovie.title = updatedMovieData.title || existingMovie.title;
    existingMovie.description =
      updatedMovieData.description || existingMovie.description;
    existingMovie.image = updatedMovieData.image || existingMovie.image;
    existingMovie.genres = updatedMovieData.genres || existingMovie.genres;
    existingMovie.popularity =
      updatedMovieData.popularity || existingMovie.popularity;
    existingMovie.releaseDate =
      updatedMovieData.releaseDate || existingMovie.releaseDate;
    existingMovie.reviews = updatedMovieData.reviews || existingMovie.reviews;

    const updatedMovie = await existingMovie.save();

    res.status(200).json(updatedMovie);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get movies by genre (GET)
router.get("/genre/:genre", async (req, res) => {
  try {
    const genre = req.params.genre;

    // Find movies with the specified genre
    const movies = await Movie.find({ genres: genre });

    if (movies.length === 0) {
      return res
        .status(404)
        .json({ message: "No movies found for the specified genre." });
    }

    res.json(movies);
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get movies in descending popularity (GET)
router.get("/popular", async (req, res) => {
  try {
    // Find movies with the specified genre
    const movies = await Movie.find().sort({ popularity: -1 }).limit(50);

    if (movies.length === 0) {
      return res
        .status(404)
        .json({ message: "No movies found for the specified genre." });
    }

    res.json(movies);
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
