const express = require("express")
const {getHome} = require("../controllers/homeController")
const {getUser, searchUser, updateUser, deleteUser, createUser, loginUser} = require('../controllers/userController')
const {authenticate} = require('../middleware/auth')
const router = express.Router()

router.route('/')
    .get(getUser)
    .post(createUser)
    .put(updateUser)
    .delete(deleteUser)

router.route('/:username')
    .get(searchUser)

router.route('/login')
    .post(loginUser)


module.exports = router
