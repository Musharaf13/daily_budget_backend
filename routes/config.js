express = require("express");
app = express.Router();
const { Pool } = require("pg");
require("dotenv").config();
const bodyParser = require("body-parser");
var cors = require("cors");
//PRODUCTION LIVE DB
const LIVE_DB = process.env.DB_LIVE;

//DEVELOPMENT DB
const DEV_DB = process.env.DB_DEV;

const poolObj = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  //TODO: change to Live / Dev DB respective to repository/branch.
  database: DEV_DB,
  ssl: true,
};

// app.pool = ;
module.exports = new Pool(poolObj);
