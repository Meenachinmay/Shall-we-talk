const mongoose = require ('mongoose')
const crypto = require ('crypto')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        max: 32
    },
    email: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        unique: true
    },
    hashed_password: {
        type: String,
        required: true,
    },
    salt: {
        type: String
    },
    role: {
        type: String,
        default: 'subscriber'
    },
    resetPasswordLink: {
        data: String,
        default: ''
    }
}, { timestamps: true })

// virtual
userSchema.virtual('password')
    .set( function(password){
        this._password = password
        this.salt = this.makeSalt()

        this.hashed_password = this.encryptPassword(password)
    })
    .get( function() {
        return this._password;
    })

 // methods
 userSchema.methods = {
     // to authenticate the password for logging in
     authenticate: function (plaintext) {
         return this.encryptPassword(plaintext) === this.hashed_password
     },
     // to encrypt the password
     encryptPassword: function(password) {
        if (!password) return ''

        try {
            return crypto.createHmac('sha1', this.salt)
            .update(password)
            .digest('hex')
        }catch(e) {
            return ''
        }
     },
     // to generate salt
     makeSalt: function() {
         return Math.round(new Date().valueOf()  * Math.random()) + ''
     }
 }

 module.exports = mongoose.model('User', userSchema)