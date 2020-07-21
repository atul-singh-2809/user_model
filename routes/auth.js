const express = require('express')
const router = express.Router()

const authcontroller = require('../controller/authcontroller')

router.post('/register',authcontroller.register)

module.exports = router