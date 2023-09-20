const blogService = require("../services/blog.service");
const asyncHandler = require("express-async-handler");

const getAllBlogPosts = asyncHandler(async (req, res) => {
  try {
    const blogs = await blogService.getAllPosts(req.user.id);
    if (!blogs) {
      res.status(404);
      throw new Error("No blogs found");
    }
    res.status(200).json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    console.log(error);
  }
});
const createBlogPost = asyncHandler(async (req, res) => {
  try {
    const response = await blogService.createPost({
      user_id: req.user.id,
      title: req.body.title,
      description: req.body.description,
    });
    if (!response) {
      res.status(400);
      throw new Error("Error creating blog");
    }
    res.status(201).json({
      message: "Blog created successfully",
      data: response,
    });
  } catch (error) {
    console.log(error);
  }
});
const getBlogPostById = asyncHandler(async (req, res) => {
  try {
    const response = await blogService.getPostsById(req.params.id);
    if (!response) {
      res.status(400);
      throw new Error("Error fetching blog");
    }
    res.status(200).json({
      message: "Blog fetched successfully",
      data: response,
    });
  } catch (error) {
    console.log(error);
  }
});
const updateBlogPost = asyncHandler(async (req, res) => {
  try {
    const response = await blogService.updatePost(req.params.id, {
      title: req.body.title,
      description: req.body.description,
    });
    if (!response) {
      res.status(400);
      throw new Error("Error updating blog");
    }
    res.status(200).json({
      message: "Blog updated successfully",
      data: response,
    });
  } catch (error) {
    console.log(error);
  }
});
const deleteBlogPost = asyncHandler(async (req, res) => {
  try {
    const response = await blogService.deletePost(req.params.id);
    if (!response) {
      res.status(404);
      throw new Error("Blog not found");
    }
    res.status(200).json({
      message: "Blog deleted successfully",
      data: response,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  getAllBlogPosts,
  createBlogPost,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
};
