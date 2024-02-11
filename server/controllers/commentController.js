const Comment = require("../models/commentModel");
const Post = require("../models/postModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// comments
exports.createComment = catchAsync(async (req, res, next) => {
  const post = req.params.postId;
  const user = req.user.id;
  const comment = req.body.comment;

  const isPostValid = await Post.findById(post);

  if (!isPostValid) next(new AppError("No post found with that ID!", 404));

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
