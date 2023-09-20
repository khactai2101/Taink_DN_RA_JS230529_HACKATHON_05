require("dotenv").config();
const express = require("express");
const app = express();
const fs = require("fs");
const crypto = require("crypto");
const port = process.env.PORT || 3000;

var bodyParser = require("body-parser");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var jsonParser = bodyParser.json();

var urlencodedParser = bodyParser.urlencoded({ extended: true });

//Hello
app.get("/", (req, res) => {
  res.send("Hello App");
});
//GET →  Lấy về dữ liệu của toàn bộ users
app.get("/api/", (req, res) => {
  const data = fs.readFileSync("./user-post-api/users.json", "utf-8");
  const dataUser = JSON.parse(data);
  res.status(200).json(dataUser);
});
//GET →  Lấy về dữ liệu của một user
app.get("/api/:id", (req, res) => {
  const data = fs.readFileSync("./user-post-api/users.json", "utf-8");
  const dataUser = JSON.parse(data);
  const idParam = req.params.id;
  if (idParam) {
    const user = dataUser.find((item) => {
      return item.id == idParam;
    });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  }
});
//POST →  Thêm mới dữ liệu về 1 users vào trong CSDL
app.post("/api", (req, res) => {
  const data = fs.readFileSync("./user-post-api/users.json", "utf-8");
  const dataUser = JSON.parse(data);
  const newUser = req.body;
  console.log(newUser);
  newUser.id = crypto.randomUUID();
  console.log(newUser);
  dataUser.push(newUser);
  fs.writeFileSync("./user-post-api/users.json", JSON.stringify(dataUser));
  res.status(200).send({ mes: "Create successfully" });
});
// PUT →  Chỉnh sửa dữ liệu của 1 user
app.put("/api/:id", (req, res) => {
  const data = fs.readFileSync("./user-post-api/users.json", "utf-8");
  const dataUser = JSON.parse(data);
  const idParam = req.params.id;
  const updateUser = req.body;
  const userIndex = dataUser.findIndex((user) => user.id == idParam);
  if (userIndex !== -1) {
    dataUser[userIndex] = { ...dataUser[userIndex], ...updateUser };
    fs.writeFileSync("./user-post-api/users.json", JSON.stringify(dataUser));
    res.status(200).json({
      message: "User updated successfully",
    });
  } else {
    res.status(404).json({ error: "User not found" });
  }
});
// DELETE → Xoá dữ liệu về một user
app.delete("/api/:id", (req, res) => {
  const data = fs.readFileSync("./user-post-api/users.json", "utf-8");
  const dataUser = JSON.parse(data);

  const idParam = +req.params.id;

  const newDataUser = dataUser.filter((user) => user.id !== idParam);

  if (newDataUser.length > 0) {
    fs.writeFileSync("./user-post-api/users.json", JSON.stringify(newDataUser));

    res.status(200).json({
      message: "User deleted successfully",
    });
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
