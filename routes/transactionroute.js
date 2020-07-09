const express = require('express')
const router = express.Router();

const { addTransaction, getTransactionById, deleteTransaction, getAllTransactionsForMonth, getTransactionCategories } = require('../controllers/transactioncontroller')
const { getTransactionCreationErrors, transactionValidation } = require('../validation/transactionvalidation')

router.post("/", getTransactionCreationErrors, transactionValidation, addTransaction)
router.delete("/:transactionId", deleteTransaction)
router.get("/", getAllTransactionsForMonth)
router.get("/types", getTransactionCategories)

router.param("transactionId", getTransactionById)

module.exports = router;
