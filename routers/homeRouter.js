const express = require("express")
const {authenticate} = require('../middleware/auth')
const {getHome} = require('../controllers/homeController')
const router = express.Router()

router.route('/')
    .get(authenticate, getHome)

module.exports = router