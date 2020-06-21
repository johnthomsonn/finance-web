const {check, validationResult} = require("express-validator");
const {transactionCategories} = require('../models/transactioncategories')

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
  .custom(value => value === 'income'|| value ===  'expenditure')
  .withMessage("Transaction type must be income or expenditure"),

  check('category')
  .custom(value => transactionCategories.includes(value))
  .withMessage("category must be one of " + transactionCategories)
]


exports.transactionValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errArray = errors.array();
    const msgs = errArray.map(error => error.msg);
    return res.status(400).json({error: msgs});
  }
  next();
};
