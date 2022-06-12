const express = require("express")
const {authenticate} = require('../middleware/auth')
const {getConversation, createConversation} = require('../controllers/conversationController')
const router = express.Router()

router.route('/')
    .get(authenticate, getConversation)
    .post(authenticate, createConversation)

module.exports = router
