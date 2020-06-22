const express = require('express')
const cLog = require('../utils/Custom-Logging')

exports.getMonthByUrlParam = (req,res, next, month) => {
  const [monthUrl, day] = month.split("-")
  cLog.debug(monthUrl + ":" + day)
}
