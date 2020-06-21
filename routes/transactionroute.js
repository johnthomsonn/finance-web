const express = require('express')
const router = express.Router();

const {addTransaction} = require('../controllers/transactioncontroller')

router.post("/", addTransaction)

module.exports = router;
