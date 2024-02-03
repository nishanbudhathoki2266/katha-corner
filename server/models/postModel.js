const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    // Basically, I am assuming description as a caption for image or if there's no image, it's kind of a stand alone status!
    description: {
      type: String,
      trim: true,
      maxlength: [500, "A caption must have less or equal to 500 characters"],
      minLength: [10, "A caption must have at least 10 characters"],
    },
    image: String,
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A post must have a user"],
    },
    location: {
      type: String,
      default: "Somewhere uder the sky",
    },
    deleted: {
      type: Boolean,
      default: false,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

postSchema.pre(/^find/, function (next) {
  // Todo: Also populate user's photo in future
  this.populate({ path: "user", select: "name email" });
  next();
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
