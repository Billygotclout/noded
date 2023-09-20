const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = asyncHandler(
  async ({ firstname, lastname, email, password }) => {
    const user = await User.findOne({ email });
    if (user) {
      throw new Error("User already exists");
    }

    const newUser = new User({
      firstname,
      lastname,
      email,
    });
    const hashedPassword = await bcrypt.hash(password, 10);
    newUser.password = hashedPassword;

    await newUser.save();
    return newUser;
  }
);
exports.login = asyncHandler(async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  const correctLogin =
    user.email && bcrypt.compareSync(password, user.password);
  if (!correctLogin) {
    throw new Error("Invalid Username or Password");
  }
  return user;
});
exports.refreshToken = asyncHandler(async ({ token }) => {
  const user = await User.findOne({ token });
  if (!user) {
    throw new Error("User not found");
  }
  const payload = {
    id: user._id,
    email: user.email,
  };
  const newToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  user.token = newToken;
  await user.save();
  return newToken;
});
exports.logout = asyncHandler(async ({ token }) => {
  const user = await User.findOne({ token });
  user.token = "";
  await user.save();
  return true;
});
