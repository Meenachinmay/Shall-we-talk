const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')
const cors = require('cors')
const morgan = require ('morgan')
const connectDB = require ('./db.connect')
const EVENTS = require ('./config/default')

const sgMail = require ('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const socket = require('./socket')

require('dotenv').config()

// import route
const authRouter = require('./routes/auth/index')

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

app.get('/hello', (_req, res) => {
    return res.status(200).json({
        message: "hello world"
    })
})

app.get('/sendemail/sendgrid', (_req, res) => {
    const msg = {
        to: "chinmayanand896@icloud.com",
        from: "m.mahichoudhry@gmail.com",
        subject: "Sending with sendgird",
        text: "It is a sending email",
        html: '<a href="http://localhost:8000/hello">Click here to open</a>',
    }

    sgMail.send(msg)
        .then(() => {
            console.log('email sent')
            return res.status(200).json({
                message: "email sent"
            })
        })
        .catch((error) => {
            console.error(error)
        })
})