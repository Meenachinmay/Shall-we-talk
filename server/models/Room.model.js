const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 32,
        unique: true
    },
    vacant: {
        type: Boolean,
        default: true,
    },
    takenBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }
})

module.exports = mongoose.model('Room', roomSchema)