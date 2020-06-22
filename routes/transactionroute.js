const express = require('express')
const router = express.Router();

const {addTransaction,getTransactionById,deleteTransaction, getAllTransactionsForMonth } = require('../controllers/transactioncontroller')
const {getTransactionCreationErrors,transactionValidation} = require('../validation/transactionvalidation')

router.post("/", getTransactionCreationErrors, transactionValidation,  addTransaction)
router.delete("/:transactionId",  deleteTransaction)
router.get("/", getAllTransactionsForMonth)

router.param("transactionId", getTransactionById )

module.exports = router;
