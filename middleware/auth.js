const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")

const authenticate = asyncHandler(async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]
      const decode = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decode.id).select("-password")
    } catch (err) {
      return res.json({message: "Not authorized."})
    }

    if (!req.user) {

      return res.json({message: "User does not exist."})
    }
    next()
  } else {
    return res.json({message: "Bad token."})
  }

  if (!token) {
    return res.json({message: "No token, not authorized."})
  }
})

module.exports = { authenticate }
