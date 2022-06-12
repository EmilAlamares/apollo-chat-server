const mongoose = require("mongoose")

const messageSchema = mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "No sender id."],
    },
    recipientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "No recipient id."],
    },
    message: {
      type: String,
      required: [true, "Empty message field."],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Message", messageSchema)
