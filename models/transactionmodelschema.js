const express = require('express')
const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema
const {transactionCategories} = require('./transactioncategories')


transactionSchema = new mongoose.Schema({
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
  transactionType: {
    type : String,
    enum : ['income' , 'expenditure'],
    required : true
  },
  category : {
    type : String,
    enum : transactionCategories,
    required : true
  },
  created : {
    type: Date,
    default : Date.now
  }
})


module.exports = transactionSchema
