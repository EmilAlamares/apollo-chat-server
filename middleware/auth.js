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
      throw new Error(`Not authorized.`)
    }

    if (!req.user) {
      res.status(401)
      throw new Error("User does not exist.")
    }
    next()
  } else {
    res.status(401)
    throw new Error("Bad token.")
  }

  if (!token) {
    res.status(401)
    throw new Error("No token, not authorized.")
  }
})

module.exports = { authenticate }
