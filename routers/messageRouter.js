const express = require("express")
const { authenticate } = require("../middleware/auth")
const {
  getMessage,
  createMessage,
} = require("../controllers/messageController")
const router = express.Router()

router.route("/:id").get(authenticate, getMessage)

router.route("/").post(authenticate, createMessage)

module.exports = router
