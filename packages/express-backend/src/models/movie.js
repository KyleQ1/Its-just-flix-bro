import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String, // image URL
      required: true,
    },
    genres: {
      type: [String], // array of genres
      required: true,
    },
    popularity: {
      type: Number,
      required: true,
    },
    releaseDate: {
      type: String,
      required: true,
    },
    reviews: [
      {
        review: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Review",
        },
      },
    ],
  },
  { collection: "Movies" },
);

movieSchema.statics.createMovie = async function (data) {
  try {
    const requiredFields = ['title', 'description', 'image', 'genres', 'popularity', 'releaseDate'];

    // Check if all required fields are present in the data
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }
    const movie = new this(data);
    await movie.save();  
    return movie;
  } catch (error) {
    throw new Error(`Failed to create movie: ${error.message}`);
  }
};


movieSchema.statics.deleteMovie = async function (movieId) {
  try {
    // Find the movie without actually fetching it
    const movie = new this({ _id: movieId });

    // Check if the movieId is valid (e.g., a valid ObjectId)
    if (!movieId || !movie._id) {
      throw new Error("Invalid movieId");
    }

    // Delete the movie without fetching it
    const deleteResult = await this.deleteOne({ _id: movieId });

    if (deleteResult.deletedCount === 0) {
      throw new Error("Movie not found");
    }

    // Delete associated reviews
    await Review.deleteMany({ movie: movieId });

    return { message: "Movie and associated reviews deleted successfully" };
  } catch (error) {
    throw new Error(`Failed to delete movie: ${error.message}`);
  }
};
movieSchema.statics.getMovieById = async function (movieId) {
  try {
    const movie = await this.findById(movieId).populate("reviews.review");
    if (!movie) {
      throw new Error("Movie not found");
    }
    return movie;
  } catch (error) {
    throw new Error("Failed to get movie");
  }
};

movieSchema.statics.updateMovieById = async function (movieId, updatedMovieData) {
  try {
    // Ensure updatedMovieData is an object
    if (typeof updatedMovieData !== 'object' || updatedMovieData === null) {
      throw new Error('Invalid updatedMovieData. Must be an object.');
    }

    const existingMovie = await this.findById(movieId);
    if (!existingMovie) {
      throw new Error('Movie not found');
    }

    // Update movie fields with the provided data
    existingMovie.title = updatedMovieData.title || existingMovie.title;
    existingMovie.description = updatedMovieData.description || existingMovie.description;
    existingMovie.image = updatedMovieData.image || existingMovie.image;
    existingMovie.genres = updatedMovieData.genres || existingMovie.genres;
    existingMovie.popularity = updatedMovieData.popularity || existingMovie.popularity;
    existingMovie.releaseDate = updatedMovieData.releaseDate || existingMovie.releaseDate;
    existingMovie.reviews = updatedMovieData.reviews || existingMovie.reviews;

    // Save the updated movie
    const updatedMovie = await existingMovie.save();

    return updatedMovie;
  } catch (error) {
    throw new Error(`Failed to update movie: ${error.message}`);
  }
};

movieSchema.statics.getMoviesByGenre = async function (genre) {
  try {
    const movies = await this.find({ genres: genre });

    if (movies.length === 0) {
      throw new Error("No movies found for the specified genre.");
    }

    return movies;
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    throw new Error("Internal Server Error");
  }
};

movieSchema.statics.getPopularMovies = async function () {
  try {
    const movies = await this.find().sort({ popularity: -1 }).limit(50);

    if (movies.length === 0) {
      throw new Error("No popular movies found.");
    }

    return movies;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw new Error("Internal Server Error");
  }
};

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
