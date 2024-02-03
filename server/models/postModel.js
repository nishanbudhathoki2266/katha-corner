const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
      trim: true,
      maxlength: [200, "A caption must have less or equal to 200 characters"],
      minLength: [10, "A caption must have at least 10 characters"],
    },
    image: String,
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    location: {
      type: String,
      default: "Itahari, Nepal",
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
