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
});

userSchema.pre("save", async function (next) {
  // We only want to encrypt password while saving or password is modified
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  // This is how we delete field from db! This field was just to make sure that the users entered two correct passwords
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
