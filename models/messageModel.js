const mongoose = require("mongoose")

const messageSchema = mongoose.Schema(
  {
    conversationId:{
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'No conversation id.'],
      ref: 'conversations'
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "No sender id."],
    },
    recipientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    message: {
      type: String,
      required: [true, "Empty message field."],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Message", messageSchema)
