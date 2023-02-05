const express = require("express");
const app = express();
const user = require("./routes/user");

app.use("/user", user);

app.get("/", (req, res) => {
  res.send("this is first page");
});

module.exports = app;
