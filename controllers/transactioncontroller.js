const express = require('express')

exports.addTransaction = (req,res) => {
  return res.json({
    message : "add"
  })
}
