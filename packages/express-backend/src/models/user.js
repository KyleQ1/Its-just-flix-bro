import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
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
          ref: "Movie",
        },
      },
    ],
    reviews: [
      {
        review: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Review",
        },
      },
    ],
  },
  { collection: "Users" },
);

UserSchema.statics.createUser = async function (data) {
  try {
    const { email, password } = data;

    const existingUser = await this.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const user = new this({ email, password });
    await user.save();

    return { message: "User created successfully", user };
  } catch (error) {
    throw new Error("Failed to create user");
  }
};

UserSchema.statics.loginUser = async function (data) {
  try {
    const { email, password } = data;

    const user = await this.findOne({ email });
    if (!user) {
      throw new Error("Invalid username or password");
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new Error("Invalid username or password");
    }

    return { message: "Login successful", token: jwt.sign({ _id: user._id }, process.env.JWT_SECRET) };
  } catch (error) {
    throw new Error("Failed to login user");
  }
};

UserSchema.statics.deleteUser = async function (userId) {
  try {
    const user = await this.findByIdAndDelete(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return { message: "User deleted successfully" };
  } catch (error) {
    throw new Error("Failed to delete user");
  }
};

UserSchema.statics.getUserById = async function (userId) {
  try {
    const user = await this.findById(userId).populate("watchlist.movie").populate("reviews.review");
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error("Failed to get user");
  }
};

UserSchema.statics.updateUserById = async function (userId, updatedUserData) {
  try {
    const existingUser = await this.findById(userId);
    if (!existingUser) {
      throw new Error("User not found");
    }

    existingUser.email = updatedUserData.email || existingUser.email;
    existingUser.password = updatedUserData.password || existingUser.password;
    existingUser.watchlist = updatedUserData.watchlist || existingUser.watchlist;
    existingUser.reviews = updatedUserData.reviews || existingUser.reviews;

    const updatedUser = await existingUser.save();

    return updatedUser;
  } catch (error) {
    throw new Error(`Failed to update user: ${error.message}`);
  }
};

const User = mongoose.model("User", UserSchema);

export default User;
