const Comment = require("../models/commentModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// comments
exports.createComment = catchAsync(async (req, res, next) => {
  const { user, post, comment } = req.body;

  const newComment = await Comment.create({
    user,
    post,
    comment,
  });

  res.status(200).json({
    status: "success",
    data: {
      comment: newComment,
    },
  });
});

// Get all comments of a post!
exports.getCommentByPost = catchAsync(async (req, res, next) => {
  const { id } = req.body;

  const newComment = await Comment.create({
    user,
    post,
    comment,
  });

  res.status(200).json({
    status: "success",
    data: {
      comment: newComment,
    },
  });
});
