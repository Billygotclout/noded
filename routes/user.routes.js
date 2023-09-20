const express = require("express");
const {
  signUpUser,
  loginUser,
  currentUser,
  logoutUser,
  refreshUserToken,
} = require("../controllers/userController");
const validateToken = require("../middleware/validateToken");

const router = express.Router();

router.route("/signup").post(signUpUser);
router.route("/login").post(loginUser);
router.route("/current").get(validateToken, currentUser);
router.route("/refresh").post(validateToken, refreshUserToken);
router.route("/logout").post(validateToken, logoutUser);

module.exports = router;
