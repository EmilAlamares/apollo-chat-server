const asyncHandler = require("express-async-handler")
const Message = require("../models/messageModel")
const Conversation = require("../models/conversationModel")

const getMessage = asyncHandler(async (req, res) => {
  const userId = req.user.id
  try {
    const message = await Message.find({ users: { $in: userId } })
    res.json({ message })
  } catch (err) {
    console.log(err)
  }
})

const createMessage = asyncHandler(async (req, res) => {
  if (!req.body.senderId || !req.body.recipientId || !req.body.message)
    return res.json({ msg: "Please input all fields." })

  if (req.user.id !== req.body.senderId) {
    return res.json({ msg: "Not authorized." })
  }

  // Check if there is an existing conversation between the two users.
  const data = [req.body.senderId, req.body.recipientId].sort()
  const convExists = await Conversation.findOne({ users: data })

  if (convExists) {
    return res.json({ msg: "Conversation exists." })
  } else {
    return res.json({ msg: "New conversation must be initialized." })
  }

  //   try {
  //     const message = await Message.create({
  //       users: [req.body.senderId, req.body.recipientId],

  //     })
  //     res.json(message)
  //   } catch (err) {
  //     console.log(err)
  //   }
})

module.exports = { getMessage, createMessage }
