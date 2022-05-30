const express = require("express")
const {getUser, updateUser, deleteUser, createUser, loginUser} = require('../controllers/userController')
const router = express.Router()

router.route('/')
    .get(getUser)
    .post(createUser)
    .put(updateUser)
    .delete(deleteUser)

router.route('/login')
    .post(loginUser)

module.exports = router
