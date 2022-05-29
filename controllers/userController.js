const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const asyncHandler = require("express-async-handler")
const { genSalt } = require("bcrypt")
const res = require("express/lib/response")

const getUser = asyncHandler(async (req, res) => {
  res.send("Get user")
})

const createUser = asyncHandler(async (req, res) => {
  let token
  const { username, password } = req.body

  if (!username || !password) {
    res.status(400)
    throw new Error("Please input valid credentials.")
  }

  const userExists = await User.findOne({ username })

  if (userExists) {
    res.status(400)
    throw new Error("User already exists.")
  }
  salt = await bcrypt.genSalt(10)
  hashedPassword = await bcrypt.hash(password, salt)

  const user = await User.create({
    username,
    password: hashedPassword,
  })

  if (user) {
    res.status(200)
    res.json({
      username,
      password: hashedPassword,
      token: generateToken(user._id),
    })
  } else {
    res.status(200)
    throw new Error("Invalid data.")
  }
})

const updateUser = asyncHandler(async (req, res) => {
  res.send("Update user")
})

const deleteUser = asyncHandler(async (req, res) => {
  res.send("Delete")
})

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" })
}

module.exports = { getUser, updateUser, createUser, deleteUser }
