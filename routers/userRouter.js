const express = require("express")
const {getUser, updateUser, deleteUser, createUser} = require('../controllers/userController')
const router = express.Router()

router.route('/')
    .get(getUser)
    .post(createUser)
    .put(updateUser)
    .delete(deleteUser)

module.exports = router
