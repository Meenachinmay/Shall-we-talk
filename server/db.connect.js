const mongoose = require('mongoose')


const connectDB = () => {
    mongoose.connect("mongodb://localhost:27017/real-connect", {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log("Connected to database...")
    })
    .catch(error => {
        console.error(error)
    })
}

module.exports = connectDB