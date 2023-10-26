import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reviewText: {
      type: String,
      required: true,
    },
    reviewTitle: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  { collection: "Reviews" }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
