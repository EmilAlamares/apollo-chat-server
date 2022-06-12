const asyncHandler = require("express-async-handler")
const Conversation = require("../models/conversationModel")

const getConversation = asyncHandler(async (req, res) => {
  const userId = req.user.id

  try {
    const conversation = await Conversation.find({userId})
    res.json({conversation})
  } catch (err) {
    console.log(err)
  }

})

const createConversation = asyncHandler(async (req, res) => {
  if (!req.body.senderId || !req.body.receiverId)
    return res.json({ msg: "Please input all fields." })

  const data = [req.body.senderId, req.body.receiverId]
  const convExists = await Conversation.findOne({ users: { $in: data } })

  if (convExists) {
    return res.json({ msg: "Conversation already exists." })
  }

  try {
    const conversation = await Conversation.create({
      users: [req.body.senderId, req.body.receiverId],
    })
    res.json(conversation)
  } catch (err) {
    console.log(err)
  }
})

module.exports = { getConversation, createConversation }
