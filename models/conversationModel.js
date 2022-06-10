const mongoose = require("mongoose")

const conversationSchema = mongoose.Schema({
  senderId: {
    type: mongoose.Types.ObjectId,
    required: [true, "Please add a sender id."],
    ref: 'users'
  },
  recipientId:{
      type: mongoose.Types.ObjectId,
      required: [true, "Please add a recipient id."],
      ref: 'users'
  },
  message: {
    type: String,
    required: [true, "Please add a message."],
  }
}, {timestamps: true})

module.exports = mongoose.model('Conversation', conversationSchema)
