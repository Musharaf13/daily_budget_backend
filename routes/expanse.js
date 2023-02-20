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
  const { userId, startDate, endDate } = req.body;

  console.log("req body");

  console.log(req.body);

  var analyticsQuery = `Select 
  (Select Sum(amount) from expenses where user_id=${userId} and created_at::date between '${startDate}'::date and '${endDate}'::date) as total_expense,
  Sum(amount) as amount, 
  To_Char(created_at::date,'dd') as date from expenses 
    where user_id=${userId} and created_at::date between '${startDate}'::date and '${endDate}'::date
    group by date
  `;

  var limitsQuery = `select
  monthly_budget,working_day_budget, weekends_budget, daily_budget from monthly_budgets 
  where created_at::date between '${startDate}'::date and '${endDate}'::date and user_id=${userId}
  order by created_at desc limit 1`;
  console.log("analysis query");
  console.log(analyticsQuery);
  console.log("limits Query");
  console.log(limitsQuery);
  pool.query(analyticsQuery, async (error, result) => {
    if (!error) {
      pool.query(limitsQuery, (limitsError, limitsResult) => {
        if (!limitsError) {
          res.send({
            status: true,
            data: {
              limits: limitsResult.rows,
              expenseAnalysis: result.rows,
            },
          });
        } else {
          res.send({
            status: false,
            message: "Failed to fetch Limits" + limitsError.message,
          });
        }
      });
    } else {
      res.send({
        status: false,
        message: "Failed to Expense Analysis" + error.message,
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
