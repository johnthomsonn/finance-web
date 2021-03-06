const { check, validationResult } = require("express-validator");
const { incomeCategories, expenditureCategories } = require("../models/transactioncategories")
const cLog = require("../utils/Custom-Logging")

exports.getTransactionCreationErrors = [
  check("description", "description is required")
    .not()
    .isEmpty()
    .trim()
    .escape(),

  check("amount", "amount is required")
    .not()
    .isEmpty()
    .custom(value => value > 0)
    .withMessage("amount should be greater than 0")
    .custom(value => /^\d+(\.\d{1,2})?$/.test(value))
    .withMessage("invalid amount. Must have a maximum of 2 decimal places."),

  check("transactionType")
    .custom(value => value === "income" || value === "expenditure" || value === "Income" || value === "Expenditure")
    .withMessage("Transaction type must be income or expenditure"),

  check("category")
    .custom(value => incomeCategories.includes(value) || expenditureCategories.includes(value))
    .withMessage("category must be one of " + incomeCategories + " or " + expenditureCategories),

  check("transactionType")
    .custom((value, { req }) => {
      if (value === "income" || value === "Income") {
        return incomeCategories.includes(req.body.category)
      }
      else
        return expenditureCategories.includes(req.body.category)
    })
    .withMessage("Invalid category for transaction type"),

  check("date")
    .custom(date => {
      const [year, month, day] = date.split("-")
      const daysInMonth = getMonthDaysFromString(month)
      if (year >= new Date(Date.now()).getFullYear() - 1)
        if (month >= 1 && month <= 12)
          if (day >= 1 && day <= daysInMonth)
            return true
      return false
    })
    .withMessage("Invalid date. Must be in the form yyyy-mm-dd with valid numbers")

];


exports.transactionValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errArray = errors.array();
    const msgs = errArray.map(error => error.msg);
    return res.status(400).json({ error: msgs });
  }
  next();
};

const getMonthDaysFromString = (monthStr) => {
  let num = 0;
  switch (monthStr) {
    case "1":
      num = 31;
      break
    case "2":
      num = 29
      break
    case "3":
      num = 31
      break
    case "4":
      num = 30
      break
    case "5":
      num = 31;
      break
    case "6":
      num = 30
      break
    case "7":
      num = 31
      break
    case "8":
      num = 31
      break
    case "9":
      num = 30;
      break
    case "10":
      num = 31
      break
    case "11":
      num = 30
      break
    case "12":
      num = 31
      break
  }
  return num;
};
