const catchAsync = require("../utils/catchAsync");

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
