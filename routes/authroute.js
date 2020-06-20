const express = require('express')
const router = express.Router()

const {signup} = require('../controllers/usercontroller')

router.get("/signup", signup)

module.exports = router
