const express = require("express");
const fs = require("fs");
const path = require("path");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnect");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();
const cors = require("cors");

connectDB();
var corsOptions = {
  // origin: [CLIENT_URL],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(errorHandler);
app.use("/api/auth", require("./routes/user.routes"));
app.use("/api/blogs", require("./routes/blog.routes"));

app.get("/", (req, res, next) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server is running on port: http://localhost:${port}`);
});
