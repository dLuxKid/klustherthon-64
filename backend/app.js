const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// db connection
mongoose
  .connect(process.env.mongodb_connect, {})
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.post("/api/posts", (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: "Post added successfully",
  });
});
app.use("/api/users",UserRouter)

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
