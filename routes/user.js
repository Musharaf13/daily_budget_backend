const express = require("express");
const app = express.Router();
const pool = require("./config");
// const pool = config.pool;
// const pooolObj = config.poolObj;

app.get("/", async (req, res) => {
  // console.log(pooolObj);
  pool.query("select  * from users", (error, result) => {
    if (!error) {
      res.send({
        status: true,
        data: result.rows,
      });
    } else {
      res.send({
        status: false,
        message: "Failed to find the user " + error.message,
      });
    }
  });
});

app.post("/login", (req, res) => {
  res.send("You are in Users file now");
});

module.exports = app;
