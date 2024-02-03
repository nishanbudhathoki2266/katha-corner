const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// Update my data
exports.updateMe = catchAsync(async (req, res, next) => {
  //  Create error if users post password data
  if (req.body.password || req.body.passwordConfirm)
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyPassword",
        400
      )
    );

  // If not, update the user document

  const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

// Delete Me
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

// USERS
exports.getAllUsers = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "All users",
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: "err",
    message: "This route is under construction",
  });
};

exports.getUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError("No user found with that ID!", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: "err",
    message: "This route is under construction",
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: "err",
    message: "This route is under construction",
  });
};
