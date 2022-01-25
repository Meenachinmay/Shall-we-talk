const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')
const cors = require('cors')
const morgan = require ('morgan')
const connectDB = require ('./db.connect')

const socket = require('./socket')

require('dotenv').config()

// import route
const authRouter = require('./routes/auth/index')

// const port = config.get<number>("port")
// const host = config.get<string>("host")
// const corsOrigin = config.get<string>("corsOrigin")

const EVENTS = {
    connection: "connection",
    CLIENT: {
        CREATE_ROOM: 'CREATE_ROOM',
        JOIN_ROOM: 'JOIN_ROOM',
    },
    SERVER: {
        ROOM_CREATED: 'ROOM_CREATED'
    }
}

const app = express()
app.use(cors({
    origin: "http://localhost:3000"
}));

const httpServer = createServer(app)

// initialize IO
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
})

// app middleware
app.use(morgan('dev'))
app.use(express.json())
app.use('/apiV1', authRouter)

// start the server
httpServer.listen(process.env.PORT, process.env.HOST, () => {
    console.log("Server is listening")

    //connect Database
    connectDB()

    // initialize sockets
    socket({ io })

    // set IO for route files also
    app.set('socket', io)
})

// routes
app.get('/test', (req, res) => {
    const io = req.app.get('socket')

    io.emit(EVENTS.SERVER.ROOM_CREATED, 
        {message: `chinmay has created a room with name myroom at server`})

    return res.json({
        message: "success"
    })
})

