const express = require("express");
const app = express.Router();
const pool = require("./config");
// const pool = config.pool;
// const pooolObj = config.poolObj;

app.post("/login", async (req, res) => {
  console.log("login API called");
  console.log(req.body);
  const { email, password } = req.body;
  var query = `select  * from users where email='${email}' and password='${password}'`;
  console.log("query =>" + query);
  pool.query(query, (error, result) => {
    if (!error) {
      if (result.rows.length > 0) {
        console.log({
          status: true,
          data: result.rows,
        });
        res.send({
          status: true,
          data: result.rows,
        });
      } else {
        console.log({
          status: false,
          message: "Email or Password is Incorrect",
        });
        res.send({
          status: false,
          message: "Email or Password is Incorrect",
        });
      }
    } else {
      console.log({
        status: false,
        message: "Failed to find the user " + error.message,
      });
      res.send({
        status: false,
        message: "Failed to find the user " + error.message,
      });
    }
  });
});

app.post("/signup", async (req, res) => {
  const { email, password, phone_number } = req.body;
  console.log("body");
  console.log(req.body);
  var query = `INSERT INTO public.users(
    email, password, phone_number)
    VALUES ('${email}', '${passwogitrd}', '${phone_number}') returning id,email,password,phone_number;`;
  pool.query(query, (error, result) => {
    if (!error) {
      console.log({
        status: true,
        message: "User added successfully",
        data: result.rows[0],
      });
      res.send({
        status: true,
        message: "User added successfully",
        data: result.rows[0],
      });
    } else {
      console.log({
        status: false,
        message: "Failed to add user" + error.message,
      });
      res.send({
        status: false,
        message: "Failed to add user" + error.message,
      });
    }
  });
});

app.get("/", (req, res) => {
  console.log("this is  user screen");
  res.send("this is  user screen");
});

app.post("/login", (req, res) => {
  res.send("You are in Users file now");
});

module.exports = app;
