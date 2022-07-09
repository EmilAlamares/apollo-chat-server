const asyncHandler = require("express-async-handler")
const Conversation = require("../models/conversationModel")

const getConversation = asyncHandler(async (req, res) => {
  const userId = req.user.id
  try {
    const conversation = await Conversation.find({ users: { $in: userId } }).sort({lastEntryModified: -1})
    res.json({ conversation })
  } catch (err) {
    console.log(err)
  }
})

const getSpecificConversation = asyncHandler(async (req, res) => {
  const { id } = req.params
  try {
    const conversation = await Conversation.find({ _id: id })
    res.json({ conversation })
  } catch (err) {
    console.log(err)
  }
})

const createConversation = asyncHandler(async (req, res) => {
  if (
    !req.body.userOneId ||
    !req.body.userTwoId ||
    !req.body.userOneName ||
    !req.body.userTwoName
  )
    return res.json({ msg: "Please input all fields." })

  const data = [req.body.userOneId, req.body.userTwoId]
  const convExists = await Conversation.findOne({ users: {$all: data} })

  if (convExists) {
    return res.json({ msg: "Conversation already exists." })
  }

  try {
    const conversation = await Conversation.create({
      users: [req.body.userOneId, req.body.userTwoId],
      usersName: [req.body.userOneName, req.body.userTwoName],
      lastEntry: {message: `${req.body.userOneName} has started a conversation.`},
      lastEntryModified: new Date()
    })
    res.json(conversation)
  } catch (err) {
    console.log(err)
  }
})

module.exports = { getConversation, getSpecificConversation, createConversation }
