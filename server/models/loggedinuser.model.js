const mongoose = require ('mongoose')

const loggedinuserSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
}, {timestamps: true})

module.exports = mongoose.model('LoggedInUser', loggedinuserSchema)