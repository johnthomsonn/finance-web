const express = require('express')
const mongoose = require('mongoos')
const {ObjectId} = mongoose.Schema

const transactionSchema = new mongoose.Schema({
  description : {
    type : String,
    required : true
  },
  amount : {
    type : Number,
    required: true
  },
  user : {
    type : ObjectId,
    ref : "User"
  },
  transaction: {
    type : String,
    enum : ['income' , 'expenditure'],
    required : true
  }
})

 module.exports = mongoose.model("Transaction", transactionSchema)
