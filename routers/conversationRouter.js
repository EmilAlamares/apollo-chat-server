const express = require("express")
const {authenticate} = require('../middleware/auth')
const {getConversation, createConversation, getSpecificConversation} = require('../controllers/conversationController')
const router = express.Router()

router.route('/')
    .get(authenticate, getConversation)
    .post(authenticate, createConversation)

router.route('/:id')
    .get(authenticate, getSpecificConversation)

module.exports = router
