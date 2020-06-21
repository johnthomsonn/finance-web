const express = require('express')
const router = express.Router();

const {addTransaction} = require('../controllers/transactioncontroller')
const {getTransactionCreationErrors,transactionValidation} = require('../validation/transactionvalidation')

router.post("/", getTransactionCreationErrors, transactionValidation,  addTransaction)

module.exports = router;
