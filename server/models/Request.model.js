const mongoose = require ('mongoose')

const requestSchema = new mongoose.Schema({
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sender: {
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


// lets talk about request feature

/*
sender always will be a logged in user

when a rquest will arrive at backend it will carry {sender, receiver, message}
then send_to_receiver message will take {message and receiver ID and update the receiver with the same}

resolve_request method will handle request for users when user wants to resolve it.
this method will take { request_id } and then with request ID can get sender and receiver

i think User should approach to resolve_request method directly in order to approve or reject a request

i think User schema should have requests field which will refer to Request schema

Request table can access -> User
User table can access -> Request table


*/ 