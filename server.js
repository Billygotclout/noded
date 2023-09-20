const express = require("express");
const fs = require("fs");
const path = require("path");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnect");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();

connectDB();
app.use(express.json());

app.use("/api/auth", require("./routes/user.routes"));
app.use("/api/blogs", require("./routes/blog.routes"));
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server is running on port: http://localhost:${port}`);
});
