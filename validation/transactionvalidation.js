const { check, validationResult } = require("express-validator");
const { incomeCategories, expenditureCategories } = require('../models/transactioncategories')
const cLog = require('../utils/Custom-Logging')

exports.getTransactionCreationErrors = [
  check('description', 'description is required')
    .not()
    .isEmpty()
    .trim()
    .escape(),

  check('amount', 'amount is required')
    .not()
    .isEmpty()
    .custom(value => value > 0)
    .withMessage("amount should be greater than 0")
    .custom(value => /^\d+(\.\d{1,2})?$/.test(value))
    .withMessage("invalid amount. Must have a maximum of 2 decimal places."),

  check('transactionType')
    .custom(value => value === 'income' || value === 'expenditure' || value === 'Income' || value === 'Expenditure')
    .withMessage("Transaction type must be income or expenditure"),

  check('category')
    .custom(value => incomeCategories.includes(value) || expenditureCategories.includes(value))
    .withMessage("category must be one of " + transactionCategories),

  check('date')
    .custom(date => {
      const [year, month, day] = date.split("-")
      const daysInMonth = getMonthDaysFromString(month)
      if (year >= 2020)
        if (month >= 1 && month <= 12)
          if (day >= 1 && day <= daysInMonth)
            return true
      return false
    })
    .withMessage('Invalid date. Must be in the form yyyy-mm-dd with valid numbers')

]


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
  monthNum = Number(monthStr)
  switch (monthNum) {
    case 01:
      num = 31;
      break
    case 02:
      num = 29
      break
    case 03:
      num = 31
      break
    case 04:
      num = 30
      break
    case 05:
      num = 31;
      break
    case 06:
      num = 30
      break
    case 07:
      num = 31
      break
    case 08:
      num = 31
      break
    case 09:
      num = 30;
      break
    case 10:
      num = 31
      break
    case 11:
      num = 30
      break
    case 12:
      num = 31
      break
  }
  return num;
}
