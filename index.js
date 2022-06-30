const express = require("express")
const cors = require("cors")
require("dotenv").config()
const userRoutes = require("./routers/userRouter.js")
const conversationRoutes = require("./routers/conversationRouter.js")
const messageRoutes = require("./routers/messageRouter.js")
const homeRoutes = require('./routers/homeRouter.js')
const { connectDatabase } = require("./config/database")
const app = express()
const PORT = process.env.PORT
const socketio = require('socket.io')
const { application } = require("express")

connectDatabase()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use("/users", userRoutes)
app.use("/conversations", conversationRoutes)
app.use("/messages", messageRoutes)
app.use("/home", homeRoutes)

const server = require("http").createServer(app)
const io = socketio(server, { 
    cors: {
        origin: ["http://localhost:3000"]
    }
})

let usersList = [] // Storage of currently connected users.

io.on('connection', socket => {
    let user = socket.handshake.query.user
    usersList = [...usersList, {user, id: socket.id}]
    console.log(`New connection... Socket ID: ${socket.id} - User Id: ${user}`)
    console.log(usersList)

    socket.on('new-message', msg => {
        console.log(`Message: ${msg.message} - To: ${msg.recipientId} - From: ${msg.senderId}`)
        usersList.map(item => {
            if (item.user = msg.recipientId)
            socket.to(item.id).emit('receiveMsg', msg.message)
        })
    }) 

    socket.on('disconnect', () => {
        console.log(`User: ${user} connected on ${socket.id} has disconnected.`)
        usersList = usersList.filter(user => socket.id !== user.id)
    })
})

server.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`))
