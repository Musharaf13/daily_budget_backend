const express = require("express");
const app = express.Router();

app.get("/", (req, res) => {
  res.send("You are in Users file now");
});

app.post("/login", (req, res) => {
  res.send("You are in Users file now");
});

module.exports = app;
