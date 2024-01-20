const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const User = require("./../models/userModel");
const AppError = require("./../utils/appError");

const signToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const sendTokenAsCookie = (res, token) => {
  res.cookie("jwt", token, {
    // Delete the cookie from browser or client after this expires time -> in ms
    expires: new Date(
      Date.now() +
        parseInt(process.env.JWT_EXPIRES_IN.split("d")[0]) * 24 * 60 * 60 * 1000
    ),
    // secure: true, // Enable this on production
    httpOnly: true,
  });
};

// Sign up a user
exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;
  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm,
  });

  const token = signToken(newUser._id);

  sendTokenAsCookie(res, token);

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});

// Log in a user
exports.signin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password exists in request
  if (!email || !password)
    return next(new AppError("Please provide email and password!", 400));

  // Check if user exists && password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError("Incorrect email or password!", 401));

  // If everything ok, send token to client
  const token = signToken(user._id);

  sendTokenAsCookie(res, token);

  res.status(200).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
});

// Auth protection
exports.protect = catchAsync(async (req, res, next) => {
  //  Get token and check if it's there
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token)
    return next(
      new AppError("You are not signed in! Please sign in to get access.", 401)
    );

  // Verify the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // Check if the user still exists
  const currentUser = await User.findById(decoded.id);

  if (!currentUser)
    return next(
      new AppError("The user belongning to the token does not exist!", 401)
    );

  // Check if user changed password after the token was issued
  if (currentUser.changePasswordAfter(decoded.iat))
    return next(
      new AppError(
        "User has recently changed password! Please log in again!",
        401
      )
    );

  // If everthing is okay, pass to next middelware in the middleware stack
  req.user = currentUser;
  next();
});

// Update authenticated user's password
exports.updatePassword = catchAsync(async (req, res, next) => {
  // Get user from the collection
  const user = await User.findById(req.user._id).select("+password");

  // Check if the posted password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password)))
    return next(new AppError("Your current password is wrong!", 401));

  // If the password is correct, update the password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;

  // Not using findByIdAndUpdate here because, some validations won't work
  await user.save();

  // Log user in again, send JWT
  const token = signToken(user._id);

  sendTokenAsCookie(res, token);

  res.status(200).json({
    status: "success",
    token,
  });
});
