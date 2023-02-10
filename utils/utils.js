const moment = require("moment");
const express = require("express");
const app = express.Router();

function calcTime() {
  offset = "+5.0";
  d = new Date();
  utc = d.getTime() + d.getTimezoneOffset() * 60000;
  currentDate = new Date(utc + 3600000 * offset);

  var dateString = moment(currentDate).format("YYYY-MM-DD HH:mm:ss");

  return dateString;
}

module.exports.calTime = calcTime;
