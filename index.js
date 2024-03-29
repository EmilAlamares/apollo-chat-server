const express = require("express")
const cors = require("cors")
require("dotenv").config()
const userRoutes = require("./routers/userRouter.js")
const conversationRoutes = require("./routers/conversationRouter.js")
const messageRoutes = require("./routers/messageRouter.js")
const homeRoutes = require('./routers/homeRouter.js')
const imageRoutes = require('./routers/imageRouter')
const { connectDatabase } = require("./config/database")
const app = express()
const PORT = process.env.PORT
const socketio = require('socket.io')
const { application } = require("express")
const upload = require('express-fileupload')

connectDatabase()

app.use(express.json())
app.use(express.urlencoded({ extended: false, limit: '5mb' }))
app.use(cors())

app.use(upload())

app.use("/users", userRoutes)
app.use("/conversations", conversationRoutes)
app.use("/messages", messageRoutes)
app.use("/home", homeRoutes)
app.use('/image', imageRoutes)

const server = require("http").createServer(app)
const io = socketio(server, { 
    cors: {
        origin: ["http://apollo-chat-client.herokuapp.com"]
    }
})

let usersList = [] // Storage of currently connected users.

io.on('connection', socket => {
    let user = socket.handshake.query.user
    usersList = [...usersList, {user, id: socket.id}]
    console.log(usersList)

    socket.broadcast.emit('userOnline', user) // Let every client know current user went online.
    socket.emit('currentOnline', usersList.map(onlineUser => onlineUser.user)) // Let connected client know who's currently online.

    socket.on('new-message', msg => {
        console.log(`Message: ${msg?.message} - To: ${msg?.recipientId} - From: ${msg?.senderId}`)
        usersList.map(item => {
            if (item.user === msg?.recipientId)
            {
                socket.to(item.id).emit('receiveMsg', msg)
            }
        })
    })

    socket.on('new-conversation', conversation => {
        usersList.map(item => {
            if (item.user === conversation?.users[1])
            {
                socket.to(item.id).emit('receiveConv', conversation)
            }
        })
    })

    socket.on('disconnect', () => {
        usersList = usersList.filter(user => socket.id !== user.id) // Remove user from usersList.
        socket.broadcast.emit('userOffline', usersList.map(onlineUser => onlineUser.user)) // Let every client know current user went offline.
    })
})

server.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`))
