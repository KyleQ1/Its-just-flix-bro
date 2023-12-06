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
  { collection: "Reviews" },
);

reviewSchema.statics.createReview = async function (data) {
  try {
    const { movieId, userId, reviewText, reviewTitle, rating } = data;

    const movie = await Movie.findById(movieId);
    const user = await User.findById(userId);

    if (!movie || !user) {
      throw new Error("Movie or user not found");
    }

    const review = new this({
      movie: movieId,
      user: userId,
      reviewText,
      reviewTitle,
      rating,
    });

    const savedReview = await review.save();

    movie.reviews.push(savedReview._id);
    user.reviews.push(savedReview._id);

    await Promise.all([movie.save(), user.save()]);

    return savedReview;
  } catch (error) {
    throw new Error("Failed to create review");
  }
};

reviewSchema.statics.deleteReview = async function (reviewId) {
  try {
    const review = await this.findByIdAndDelete(reviewId);
    if (!review) {
      throw new Error("Review not found");
    }
    return { message: "Review deleted successfully" };
  } catch (error) {
    throw new Error("Failed to delete review");
  }
};

reviewSchema.statics.getReviewById = async function (reviewId) {
  try {
    const review = await this.findById(reviewId).populate("movie").populate("user");
    if (!review) {
      throw new Error("Review not found");
    }
    return review;
  } catch (error) {
    throw new Error("Failed to get review");
  }
};

reviewSchema.statics.updateReviewById = async function (reviewId, updatedReviewData) {
  try {
    const existingReview = await this.findById(reviewId);
    if (!existingReview) {
      throw new Error("Review not found");
    }

    // Update review fields with the provided data
    existingReview.movie = updatedReviewData.movie || existingReview.movie;
    existingReview.user = updatedReviewData.user || existingReview.user;
    existingReview.reviewText = updatedReviewData.reviewText || existingReview.reviewText;
    existingReview.reviewTitle = updatedReviewData.reviewTitle || existingReview.reviewTitle;
    existingReview.rating = updatedReviewData.rating || existingReview.rating;

    // Save the updated review
    const updatedReview = await existingReview.save();

    return updatedReview;
  } catch (error) {
    throw new Error(`Failed to update review: ${error.message}`);
  }
};

const Review = mongoose.model("Review", reviewSchema);

export default Review;
