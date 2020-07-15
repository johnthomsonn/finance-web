const express = require("express");
const cLog = require("../utils/Custom-Logging");
const Transaction = require("../models/transactionmodel");
const User = require("../models/usermodel");
const { incomeCategories, expenditureCategories } = require("../models/transactioncategories");

// this will check the transaction user id matches the logged in user id
exports.getTransactionById = async (req, res, next, id) => {
  try {
    const foundTransaction = await Transaction.findById(id);
    if (foundTransaction && foundTransaction != undefined) {
      req.transaction = foundTransaction;
      next();
    } else {
      return res.status(400).json({
        error: "Error finding transaction"
      });
    }
  } catch (err) {
    cLog.error("Error finding transaction by ID");
    return res.status(400).json({
      error: "Error finding transaction"
    });
  }
};

exports.deleteTransaction = (req, res) => {
  Transaction.findOneAndDelete(
    { _id: req.transaction._id },
    (err, removedTransaction) => {
      if (err || !removedTransaction) {
        return res.status(400).json({
          error: "Could not delete transaction"
        });
      } else {
        //transaction has been deleted so remove from user transactions
        const newArray = req.user.transactions.filter(
          transaction =>
            transaction._id.toString() != removedTransaction._id.toString()
        );
        req.user.transactions = newArray;

        if (removedTransaction.transactionType === "income" || removedTransaction.transactionType === "Income")
          req.user.balance -= removedTransaction.amount;
        else
          req.user.balance += removedTransaction.amount;
        req.user.save((err, doc) => {
          if (err || !doc) {
            return res.json({
              error: "Error deleting the transaction"
            });
          } else {
            return res.json({
              message: `transaction ${removedTransaction.description} deleted`,
              balance: doc.balance
            });
          }
        });
      }
    }
  );
};

//add transaction using async await
exports.addTransaction = async (req, res) => {
  try {
    const { description, amount, transactionType, category, date } = req.body;

    const newTransaction = await new Transaction({
      description,
      amount,
      transactionType,
      category,
      user: req.user,
      created: date
    });
    const savedTransaction = await newTransaction.save();

    if (savedTransaction != undefined) {
      const user = req.user;
      let balance = user.balance;
      if (savedTransaction.transactionType === "Income" || savedTransaction.transactionType === "income")
        balance += savedTransaction.amount;
      else
        balance -= savedTransaction.amount;
      const savedUser = await User.updateOne({ _id: user._id }, { $push: { transactions: savedTransaction }, $set: { balance: balance } });

      if (savedUser != undefined) {
        return res.status(201).json({
          message: "transaction " + savedTransaction.description + " saved.",
          transaction: savedTransaction,
          balance
        });
      }
    }
    // return res.status(400).json({
    //   error: "Error when trying to add the transaction."
    // });
  } catch (err) {
    cLog.error("Error adding transaction: " + err);
    return res.status(400).json({
      error: "Error when trying to add the transaction."
    });
  }
};

exports.getAllTransactionsForMonth = (req, res) => {
  const [month, year] = req.month.split("-");
  const transactions = req.user.transactions.filter(trans => {
    return "20" + year == trans.created.getFullYear() && month == trans.created.getMonth() + 1
  });
  return res.json({
    transactions
  });
}

exports.getTransactionCategories = (req, res) => {
  return res.status(200).json({
    income: incomeCategories,
    expenditure: expenditureCategories
  });
}