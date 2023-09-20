const express = require("express");
const validateToken = require("../middleware/validateToken");
const {
  getAllBlogPosts,
  createBlogPost,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
} = require("../controllers/blogController");

const router = express.Router();
router.use(validateToken);
router.route("/").get(getAllBlogPosts);
router.route("/").post(createBlogPost);
router.route("/:id").get(getBlogPostById);
router.route("/:id").put(updateBlogPost);
router.route("/:id").delete(deleteBlogPost);

module.exports = router;
