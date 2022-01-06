const mongoose = require('mongoose')


const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
    })
    .then( () => {
        console.log("Connected to database...")
    })
    .catch(error => {
        console.error(error)
    })
}

module.exports = connectDB