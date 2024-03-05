const asyncHandler = require("express-async-handler");
const userService = require("../services/user.service");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const User = require("../models/user");

const signUpUser = asyncHandler(async (req, res, next) => {
  try {
    const response = await userService.register({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
    });
    if (!response) {
      res.status(400);
      throw new Error("Error creating user");
    }
    res.status(201).json({
      message: "User created successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
});
const loginUser = asyncHandler(async (req, res, next) => {
  try {
    const response = await userService.login({
      email: req.body.email,
      password: req.body.password,
    });
    if (!response) {
      res.status(400);
      throw new Error("Error logging in user");
    }
    const token = jwt.sign(
      {
        user: {
          email: response.email,
          password: response.password,
          id: response.id,
        },
      },
      process.env.TOKEN_SECRET,
      { expiresIn: "5h" }
    );
    response.token = token;
    await response.save();

    res.status(200).json({
      message: "User logged in successfully",
      token: token,
      data: response,
    });
  } catch (error) {
    next(error);
  }
});
const currentUser = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(400);
      throw new Error("Error fetching user");
    }
    if (!req.headers.authorization) {
      res.status(400);
      throw new Error("No token provided");
    }

    const token = req.headers.authorization.split(" ")[1];

    if (user.token !== token) {
      res.status(401);
      throw new Error("Unauthorized User");
    }
    console.log();
    res.status(200).json({ message: "User Successfully fetched", data: user });
  } catch (error) {
    next(error);
  }
});
const refreshUserToken = asyncHandler(async (req, res, next) => {
  try {
    const response = await userService.refreshToken({
      token: req.headers.authorization.split(" ")[1],
    });
    if (!response) {
      res.status(400);
      throw new Error("Error refreshing token");
    }
    res.status(200).json({ message: "Token refreshed successfully" });
  } catch (error) {
    next(error);
  }
});
const logoutUser = asyncHandler(async (req, res, next) => {
  try {
    const logout = await userService.logout({
      token: req.headers.authorization.split(" ")[1],
    });
    if (!logout) {
      res.status(400);
      throw new Error("Error logging out user");
    }
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    next(error);
  }
});
module.exports = {
  signUpUser,
  loginUser,
  currentUser,
  refreshUserToken,
  logoutUser,
};
