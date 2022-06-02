const express = require("express")
const {getHome} = require("../controllers/homeController")
const {getUser, updateUser, deleteUser, createUser, loginUser} = require('../controllers/userController')
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
