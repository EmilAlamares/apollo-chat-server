const asyncHandler = require("express-async-handler")
const Message = require("../models/messageModel")
const Conversation = require("../models/conversationModel")

const getMessage = asyncHandler(async (req, res) => {
  // const authId = req.user.id // The id that would come from the decoded token.
  const userId = req.user.id // The id from the body.
  const { id } = req.params

  // if (userId === authId) Comparing both id's to verify the identity of the user getting his own messages.

  try {
    const message = await Message.find({
      $and: [{ users: userId }, { conversationId: id }],
    })
    return res.json({ message })
  } catch (err) {
    return res.json({ err })
  }

  // return res.json({msg: "Not authorized."})
})

const createMessage = asyncHandler(async (req, res) => {
  if (!req.body.senderId || !req.body.recipientId || !req.body.message)
    return res.json({ msg: "Please input all fields." })

  if (req.user.id !== req.body.senderId) {
    return res.json({ msg: "Not authorized." })
  }

  // Check if there is an existing conversation between the two users.
  const data = [req.body.senderId, req.body.recipientId]
  const convExists = await Conversation.findOne({ users: {$all: data} })
  console.log(data)

  if (convExists) {
    try {
      const message = await Message.create({
        conversationId: convExists.id,
        senderId: req.body.senderId,
        recipientId: req.body.recipientId,
        message: req.body.message,
      })
      const conversation = await Conversation.updateOne(
        { _id: convExists.id },
        {
          $set: {
            lastEntry: {
              message: req.body.message,
              senderId: req.body.senderId,
            },
          },
        }
      )
      return res.json({ message, conversation })
    } catch (err) {
      return res.json({ err })
    }
  } else {
    return res.json({ msg: "New conversation must be initialized." })
  }
})

module.exports = { getMessage, createMessage }

//         Conversation.updateOne(
//           { id: convExists.id },
//           { $set: { lastEntry: { message: req.body.message, senderId: req.body.senderId} },
//             $currentDate: {lastModified: true}
//          }
//         )
