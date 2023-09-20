require("dotenv").config();
const express = require("express");
const app = express();
const fs = require("fs");
const crypto = require("crypto");
const port = process.env.PORT;

var bodyParser = require("body-parser");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var jsonParser = bodyParser.json();

var urlencodedParser = bodyParser.urlencoded({ extended: true });

//Hello
app.get("/", (req, res) => {
  res.send("Hello Post");
});
//GET →  Lấy về dữ liệu của toàn bộ post
app.get("/api/getAllPost", (req, res) => {
  const data = fs.readFileSync("./user-post-api/posts.json", "utf-8");
  const dataPost = JSON.parse(data);
  res.status(200).json(dataPost);
});
//GET →  Lấy về dữ liệu của một post
app.get("/api/getOnePost/:id", (req, res) => {
  const data = fs.readFileSync("./user-post-api/posts.json", "utf-8");
  const dataPost = JSON.parse(data);
  const idParam = req.params.id;
  if (idParam) {
    const post = dataPost.find((item) => {
      return item.id == idParam;
    });
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  }
});
//POST →  Thêm mới dữ liệu về 1 post vào trong CSDL
app.post("/api/createPost", (req, res) => {
  const data = fs.readFileSync("./user-post-api/posts.json", "utf-8");
  const dataPost = JSON.parse(data);
  const newPost = req.body;
  console.log(newUser);
  newPost.id = crypto.randomUUID();
  console.log(newPost);
  dataPost.push(newPost);
  fs.writeFileSync("./user-post-api/posts.json", JSON.stringify(dataPost));
  res.status(200).send({ mes: "Create successfully" });
});
// PUT →  Chỉnh sửa dữ liệu của 1 post
app.put("/api/editPost/:id", (req, res) => {
  const data = fs.readFileSync("./user-post-api/posts.json", "utf-8");
  const dataPost = JSON.parse(data);
  const idParam = req.params.id;
  const updatePost = req.body;
  const postIndex = dataPost.findIndex((item) => item.id == idParam);
  if (postIndex !== -1) {
    dataPost[postIndex] = { ...dataPost[postIndex], ...updatePost };
    fs.writeFileSync("./user-post-api/posts.json", JSON.stringify(dataPost));
    res.status(200).json({
      message: "Post updated successfully",
    });
  } else {
    res.status(404).json({ error: "Post not found" });
  }
});
// DELETE → Xoá dữ liệu về một post
app.delete("/api/deletePost/:id", (req, res) => {
  const data = fs.readFileSync("./user-post-api/posts.json", "utf-8");
  const dataPost = JSON.parse(data);
  const idParam = +req.params.id;

  const newDataPost = dataPost.filter((user) => user.id !== idParam);
  if (newDataPost.length > 0) {
    fs.writeFileSync("./user-post-api/posts.json", JSON.stringify(newDataPost));
    res.status(200).json({
      message: "Post deleted successfully",
    });
  } else {
    res.status(404).json({ error: "Post not found" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
