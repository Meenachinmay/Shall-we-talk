const mongoose = require ('mongoose')

const messageSchema = new mongoose.Schema({
    conversation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation',
        required: true
    },
    content: {
        type: String,
        required: true
    },

}, { timestamps: true })

module.exports = mongoose.model('Messages', messageSchema)