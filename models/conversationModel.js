const mongoose = require("mongoose")

const conversationSchema = mongoose.Schema(
  {
    users: {
      type: Array,
    },
    usersName: {
      type: Array,
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("Conversation", conversationSchema)
