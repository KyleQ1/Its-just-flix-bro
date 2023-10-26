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
    },
    genres: {
      type: [String], // array of genres
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
  { collection: "Movies" }
);

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
