const express = require('express')
const mongoose = require('mongoos')
const {ObjectId} = mongoose.Schema

const transacitonCategories = ['bills', 'salary', 'food', 'other', 'bad']

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
  },
  category : {
    type : String,
    enum : transacitonCategories,
    required : true
  }
})

transactionSchema.methods = {
  getCategories : () => transacitonCategories
}

 module.exports = mongoose.model("Transaction", transactionSchema)
