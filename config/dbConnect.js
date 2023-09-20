const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const asyncHandler = require("express-async-handler");

const connectDB = asyncHandler(async () => {
  const conn = await mongoose.connect(process.env.MONGODB_URI);

  console.log(
    "Db connected successfully:",
    conn.connection.host,
    conn.connection.name
  );
});

module.exports = connectDB;
