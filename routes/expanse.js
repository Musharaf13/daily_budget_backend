const express = require("express");
const app = express.Router();
const pool = require("./config");
const utils = require("../utils/utils");

// const pool = config.pool;
// const pooolObj = config.poolObj;

app.get("/", (req, res) => {
  console.log("this is  expenses screen");
  res.send("this is  expenses screen");
});

app.post("/add", async (req, res) => {
  const { categoryId, amount, description, userId } = req.body;

  console.log("req body");

  console.log(req.body);

  var query = `INSERT INTO public.expenses(
         category_id, amount, description, user_id, created_at)
        VALUES (${categoryId}, ${amount}, '${description}', ${userId}, '${utils.calTime()}');`;
  console.log(query);
  pool.query(query, (error, result) => {
    if (!error) {
      res.send({
        status: true,
        data: result.rows,
      });
    } else {
      res.send({
        status: false,
        message: "Failed to add Expense" + error.message,
      });
    }
  });
});

module.exports = app;
