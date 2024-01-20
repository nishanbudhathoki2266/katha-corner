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

exports.getUser = (req, res) => {
  res.status(500).json({
    status: "err",
    message: "This route is under construction",
  });
};

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
