const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your full name"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    // Transform the email into lowercase
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  bio: {
    type: String,
    maxLength: [
      150,
      "Please note that only 150 or less characters are allowed in bio!",
    ],
  },
  dob: {
    type: Date,
    required: [true, "Please provide your date of birth"],
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "others"],
      message: "Gender must be either male, female or others!",
    },
    default: "",
  },
  image: String,
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],

    // This only works on CREATE & SAVE!
    validate: {
      validator: function (value) {
        return this.password === value;
      },
    },
  },
  passwordChangedAt: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

// Encrypt password
userSchema.pre("save", async function (next) {
  // We only want to encrypt password while saving or password is modified
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  // This is how we delete field from db! This field was just to make sure that the users entered two correct passwords
  this.passwordConfirm = undefined;
  next();
});

// Updating the passwordChangedTimeStamp after the users change password
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// Compare passwords
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Check if the user has changed password after the generation of JWT token
userSchema.methods.changePasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < this.changedTimestamp;
  }
  return false;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
