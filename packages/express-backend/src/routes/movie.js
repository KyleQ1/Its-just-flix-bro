import express from "express";
import Movie from "../models/movie.js";
import Review from "../models/review.js";

const router = express.Router();

// Create Movie Endpoint (POST)
router.post("/", async (req, res) => {
  try {
    const movie = await Movie.createMovie(req.body);
    console.log("Success posted movie: ", req.body);
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Movie Endpoint (DELETE)
router.delete("/id/:movieId", async (req, res) => {
  const movieId = req.params.movieId;
  try {
    const result = await Movie.deleteMovie(movieId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Movie Endpoint (GET)
router.get("/id/:movieId", async (req, res) => {
  const movieId = req.params.movieId;
  try {
    const movie = await Movie.getMovieById(movieId);
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Movie by ID Endpoint (PUT)
router.put("/:movieId", async (req, res) => {
  const movieId = req.params.movieId;
  try {
    const updatedMovie = await Movie.updateMovieById(movieId, req.body);
    res.status(200).json(updatedMovie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get movies by genre (GET)
router.get("/genre/:genre", async (req, res) => {
  try {
    const genre = req.params.genre;
    const movies = await Movie.getMoviesByGenre(genre);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get movies in descending popularity (GET)
router.get("/popular", async (req, res) => {
  try {
    const popularMovies = await Movie.getPopularMovies();
    res.json(popularMovies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;