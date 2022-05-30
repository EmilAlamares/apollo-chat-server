const express = require('express')
const cors = require('cors')
require('dotenv').config()
const userRoutes = require('./routers/userRouter.js')
const {connectDatabase} = require("./config/database")
const server = express()
const PORT = process.env.PORT

connectDatabase()

server.use(express.json())
server.use(express.urlencoded({extended: false}))

server.use(cors())

server.use('/users', userRoutes)

server.listen(PORT, () => console.log(`Server started... Listening on port: ${PORT}`))
