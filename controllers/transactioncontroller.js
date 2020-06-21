const express = require('express')
const cLog = require('../utils/Custom-Logging')
const Transaction = require('../models/transactionmodel')


exports.addTransaction = async (req,res) => {
  try
  {
    const {description, amount, transactionType, category} = req.body

    const newTransaction = await new Transaction({
      description,
      amount,
      transactionType,
      category,
      user : req.user
    })
    const savedTransaction = await newTransaction.save();
    const user = req.user
    user.transactions.push(savedTransaction)
    const savedUser = user.save()

    return res.json({
      message : "transaction " + savedTransaction.description + " saved."
    })

  }
  catch(err)
  {
    cLog.error("Error adding transaction: " + err)
    return res.status(400).json({
      error : "Error when trying to add the transaction."
    })
  }

}
