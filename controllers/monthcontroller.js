const express = require('express')
const cLog = require('../utils/Custom-Logging')
const _ = require('lodash')

exports.getMonthByUrlParam = (req, res, next, month) => {
  const [monthUrl, year] = month.split("-")
  const monthNum = getMonthNumberFromString(_.toLower(monthUrl))
  if (monthNum === 0) {
    return res.status(400).json({
      error: "Invalid month, please ensure it is in the form of mmm-yy."
    })
  }
  req.month = monthNum + "-" + year
  next()

}

const getMonthNumberFromString = (monthStr) => {
  let num = 0;
  switch (monthStr) {
    case "jan":
      num = 1;
      break
    case "feb":
      num = 2
      break
    case "mar":
      num = 3
      break
    case "apr":
      num = 4
      break
    case "may":
      num = 5;
      break
    case "jun":
      num = 6
      break
    case "jul":
      num = 7
      break
    case "aug":
      num = 8
      break
    case "sep":
      num = 9;
      break
    case "oct":
      num = 10
      break
    case "nov":
      num = 11
      break
    case "dec":
      num = 12
      break
  }
  return num;
}
