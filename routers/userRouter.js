const express = require("express")
const {getUser, updateUser, deleteUser, loginUser} = require('../controllers/userController')
const router = express.Router()

router.route('/')
    .get(getUser)
    .post(loginUser)
    .put(updateUser)
    .delete(deleteUser)

module.exports = router
