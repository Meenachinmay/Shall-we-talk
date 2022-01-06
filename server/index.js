const express = require ('express')
const morgan = require ('morgan')
const cors = require('cors')
const connectDB = require ('./db.connect')

require('dotenv').config()

const app = express()

// connect to database
connectDB()

// import route
const authRouter = require('./routes/auth/index')

// app middleware
app.use(morgan('dev'))

if ((process.env.NODE_ENV == 'development')) {
    app.use(cors({origin: `http://localhost:3000`}))
}

app.use(express.json())

//middleware
app.use('/apiV1', authRouter)

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})