const mongoose = require ('mongoose')

const userprofileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    gender: {
        type: String,
        required: true,
        max:10
    },
    profile_image: {
        type: String,
        required: true
    },
    company_name: {
        type: String,
        required: true,
        max: 32
    },
    company_profile: {
        type: String,
        required: true,
        max: 32
    },
    skills : {
        type: [String],
        required: true
    },
    introduction: {
        type: String,
        required: true,
        max: 500
    }
}, {timestamps: true})

module.exports = mongoose.model('UserProfile', userprofileSchema)