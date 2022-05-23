const mongoose = require('mongoose')

const newRegistrationRequestDataSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    triedTime: {
        type: Date,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("NewRegistrationRequestData", newRegistrationRequestDataSchema)