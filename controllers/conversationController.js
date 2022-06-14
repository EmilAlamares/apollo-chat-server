const asyncHandler = require("express-async-handler")
const Conversation = require("../models/conversationModel")

const getConversation = asyncHandler(async (req, res) => {
  const userId = req.user.id
  try {
    const conversation = await Conversation.find({ users: {$in: userId} })
    res.json({ conversation })
  } catch (err) {
    console.log(err)
  }
})


const createConversation = asyncHandler(async (req, res) => {
  if (!req.body.userOneId || !req.body.userTwoId) 
    return res.json({ msg: "Please input all fields." })

  const data = [req.body.userOneId, req.body.userTwoId].sort()
  const convExists = await Conversation.findOne({ users:  data })

  if (convExists) {
    return res.json({ msg: "Conversation already exists." })
  }

  try {
    const conversation = await Conversation.create({
      users: [req.body.userOneId, req.body.userTwoId],
      usersName: [req.body.userOneName, req.body.userTwoName]
    })
    res.json(conversation)
  } catch (err) {
    console.log(err)
  }
})

module.exports = { getConversation, createConversation }
