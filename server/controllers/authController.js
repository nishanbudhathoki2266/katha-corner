const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const User = require("./../models/userModel");
const AppError = require("./../utils/appError");

const signToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;
  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});

exports.signin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password exists in request
  if (!email || !password)
    return next(new AppError("Please provide email and password!", 400));

  // Check if user exists && password is correct
  const user = await User.findOne({ email }).select("+password");
  const isPasswordCorrect =
    (await user.correctPassword(password, user.password)) || undefined;

  if (!user || !isPasswordCorrect)
    return next(new AppError("Incorrect email or password!", 401));

  // If everything ok, send token to client
  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    token,
  });
});
