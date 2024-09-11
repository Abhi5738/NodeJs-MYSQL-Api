const express = require("express");
const bodyParser = require("body-parser");
const postRouter = require("./routes/posts");
const userRouter = require("./routes/user");
const imageRouter = require("./routes/image");
const commentRouter = require("./routes/comment");
const app = express();

app.use(express.json());
// app.use(bodyParser, json());

app.use("/api", postRouter);
app.use("/api", userRouter);
app.use("/api", imageRouter);
app.use("/api", commentRouter);

app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

module.exports = app;
