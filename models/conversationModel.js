const mongoose = require("mongoose")

const conversationSchema = mongoose.Schema(
  {
    users: {
      type: Array,
    },
    usersName: {
      type: Array,
    },
    lastEntry: {
      message: { type: String },
      senderId: { type: mongoose.Schema.Types.ObjectId },
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Conversation", conversationSchema)
