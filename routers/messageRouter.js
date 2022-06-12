const express = require("express")
const {authenticate} = require('../middleware/auth')
const router = express.Router()

router.route('/')
    .get(getUser)
    .post(createUser)
    .put(updateUser)
    .delete(deleteUser)

router.route('/login')
    .post(loginUser)

router.route('/home')
    .get(authenticate, getHome)

module.exports = router
