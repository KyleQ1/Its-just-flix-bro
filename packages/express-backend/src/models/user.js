import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    watchlist: [
      {
        movie: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Movie", // Assuming you have a separate Movie schema
        },
      },
    ],
    reviews: [
      {
        review: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Review", // Assuming you have a separate Review schema
        },
      },
    ],
  },
  { collection: "Users" }
);

const User = mongoose.model("User", UserSchema);

export default User;
