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
  const { categoryId, amount, userId, date } = req.body;
  var description = req.body.description ?? "";
  console.log("req body");

  console.log(req.body);

  var query = `INSERT INTO public.expenses(
         category_id, amount, description, user_id, created_at)
        VALUES (${categoryId}, ${amount}, '${description}', ${userId}, '${
    date == "" ? utils.calTime() : date
  }');`;
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

app.post("/fetchExpansesAnalysis", async (req, res) => {
  const { userId } = req.body;

  console.log("req body");

  console.log(req.body);

  var query = `Select  Sum(amount) as amount, 
  (Select Sum(amount)
  from expenses
  ) as total_expense,
  To_Char(created_at::date,'dd') as date from expenses
  where user_id='${userId}'
  group by date
  `;
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

app.post("/fetchAllExpenses", async (req, res) => {
  const { startDate, endDate, userId } = req.body;
  console.log("req body");
  console.log(req.body);
  const categoryIds = req.body.categoryIds.join(",");
  var query = `Select SUM(amount) over() as  total_expense,category_id,amount,description from expenses
where (created_at::date  between '${startDate}'::date and '${endDate}'::date) and category_id in (${categoryIds}) and  user_id = ${userId}`;
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
