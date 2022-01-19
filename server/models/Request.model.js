const mongoose = require ('mongoose')

const requestSchema = new mongoose.Schema({
    user_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    user_from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        max: 100,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Request', requestSchema)