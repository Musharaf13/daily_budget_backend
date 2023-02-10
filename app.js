const express = require("express");
const app = express();
const user = require("./routes/user");
const expense = require("./routes/expanse");
const bodyParser = require("body-parser");
var cors = require("cors");

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());

app.use("/user", user);
app.use("/expense", expense),
  app.get("/", (req, res) => {
    res.send("this is first page");
  });

module.exports = app;
