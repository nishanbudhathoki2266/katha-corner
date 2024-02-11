const Post = require("../models/postModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// posts

// This is a controller to get all the logged in user's or the current user's posts
exports.getAllMyPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find({ user: req.user.id });

  res.status(200).json({
    status: "success",
    results: posts.length,
    data: {
      posts,
    },
  });
});

exports.getAllPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find();

  res.status(200).json({
    status: "success",
    results: posts.length,
    data: {
      posts,
    },
  });
});

exports.createPost = catchAsync(async (req, res, next) => {
  // Wip - Complete all fields
  const { description, location } = req.body;

  const user = req.user.id;

  const newPost = await Post.create({
    user,
    description,
    location,
  });

  res.status(200).json({
    status: "success",
    data: {
      post: newPost,
    },
  });
});
