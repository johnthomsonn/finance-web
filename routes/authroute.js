const express = require('express')
const router = express.Router()

const {signup} = require('../controllers/authcontroller')

router.get("/signup", signup)

module.exports = router
