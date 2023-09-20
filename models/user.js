const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please provide a firstname"],
    trim: true,
  },
  lastname: {
    type: String,
    required: [true, "Please provide a lastname"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    trim: true,
  },
  token: {
    type: String,
  },
});
module.exports = mongoose.model("User", UserSchema);
