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

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
