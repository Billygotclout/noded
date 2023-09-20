const asyncHandler = require("express-async-handler");
const Blog = require("../models/Blog");

exports.getAllPosts = asyncHandler(async (userId) => {
  const blogs = await Blog.find({ user_id: userId });

  return blogs;
});
exports.createPost = asyncHandler(async ({ user_id, title, description }) => {
  return await Blog.create({
    user_id: user_id,
    title: title,
    description: description,
  });
});
exports.getPostsById = asyncHandler(async (id) => {
  const blog = await Blog.findById(id);

  return blog;
});
exports.updatePost = asyncHandler(async (id, { title, description }) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }
  blog.title = title;
  blog.description = description;
  await blog.save();
  return blog;
});
exports.deletePost = asyncHandler(async (id) => {
  const blog = await Blog.findById(id);
  await Blog.deleteOne({ _id: id });
  return blog;
});
