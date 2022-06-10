const express = require("express")
const cors = require("cors")
require("dotenv").config()
const userRoutes = require("./routers/userRouter.js")
const { connectDatabase } = require("./config/database")
const app = express()
const PORT = process.env.PORT
const socketio = require('socket.io')

connectDatabase()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use("/users", userRoutes)

const server = require("http").createServer(app)
const io = socketio(server, { 
    cors: {
        origin: ["http://localhost:3000"]
    }
})

io.on('connection', socket => {
    console.log(`New connection... ${socket.id}`)

    socket.on('new-message', msg => {
        console.log(msg)
        socket.emit('server-new-message', 'reply')
    })
})


server.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`))
