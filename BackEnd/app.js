require("dotenv").config();
const express = require("express");
var cors = require("cors");
const app = express();
const fs = require("fs");
const crypto = require("crypto");
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// create application/json parser
const jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.get("/", (req, res) => {
  const data = fs.readFileSync("./db/data.json", "utf-8");
  const dataUser = JSON.parse(data);
  res.json(dataUser);
});
app.listen(port, (req, res) => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
