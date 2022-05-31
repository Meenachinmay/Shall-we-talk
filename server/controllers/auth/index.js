// importing all the models
const User = require('../../models/User.model')
const UserProfile = require('../../models/UserProfile.model')
const Request = require ('../../models/Request.model')
const LoggedInUser = require ('../../models/loggedinuser.model')
const Conversation = require ('../../models/Conversation.model')
const Message = require('../../models/Message.model')

// importing JWT for jsonwebtoken related work
const jwt = require ('jsonwebtoken')

// nodemailer is for sending emails for account activation
const nodemailer = require ('nodemailer')
const RoomModel = require('../../models/Room.model')

//register a user
exports.register = async (req, res) => {
    const { username, email, password } = req.body

    const user = await User.findOne({email: email});
    if ( user ) {
        return res.status(400).json({
            error: "Email is already taken"
        })
    }
    
    let newUser = new User({username, email, password})

    if (newUser) {
        await newUser.save()

        return res.status(200).json({
            message: "register success",
            newuser: newUser
        })
    } else {
        return res.status(400).json({
            message: "register failed",
            error: "Server error"
        })
    }
    
}


// send email to user to activate then save the data to the database
exports.regsiterUsingEmailActivation = async (req, res) => {
    const { name, email, password } = req.body

    const user = await User.findOne({email: email});
    if ( user ) {
        return res.status(400).json({
            message: "Email is already taken"
        })
    }

    const token = jwt.sign({name, email, password}, process.env.JWT_ACCOUNT_ACTIVATION, {expiresIn: '1h'})

    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_ADDRESS,
            pass: process.env.GMAIL_PASSWORD
        }
    })

    const emailData = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: `Account activation link`,
        text: `
            <p>Use following link to activate your account!</p>
            ${process.env.CLIENT_URL}/auth/account-activation/${token}
            <hr />
        `
    }

    mailTransporter.sendMail(emailData)
        .then(data => {
            return res.status(200).json({
                message: "Activation link sent successfully, please check your email to complete the sign up process. Link is valid for next 1 hour only.",
            })
        })
        .catch(err => {
            return res.status(400).json({
                message: err
            })
        })
}


//activate the account
exports.accountActivation = async (req, res) => {
    const { auth_token } = req.body

    if (auth_token) {
        jwt.verify(auth_token, process.env.JWT_ACCOUNT_ACTIVATION, function(err, decoded){
            if (err) {
                return res.status(400).json({
                    message: err
                })
            }
        }) 

        const newuser = jwt.decode(auth_token)

        const { name, email, password } = newuser;

        // check if account is already activated
        const checkuser = await User.findOne({email})
        if (checkuser){
            return res.status(400).json({
                message: 'Account is already activated'
            })
        } else {
            const newlyCreated = new User ({name, email, password})
            newlyCreated.accountActivated = true
            try {
                await newlyCreated.save()
                return res.status(200).json({
                    message: "Sign up done, sign in now"
                })
            } catch (error) {
                return res.status(400).json({
                    message: error
                })
            }
        }
    } else {
        return res.status(400).json({
            message: "Token is invalide"
        })
    }
}


//login a user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body

    // find the user with email in database
    const user = await User.findOne({email: email})

    if (user) {
        // authentciate the user
        if (!user.authenticate(password)) {
            return res.status(401).json({
                message: 'Incorrect passoword, please try again'
            })
        } else {
            //const newlogin = new LoggedInUser({user: user._id})
            //await newlogin.save()

            // generate a token and send that to client
            const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'})

            return res.status(200).json({
                token,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    status: user.status,
                    isOnline: user.isOnline,
                    acceptedRequests: user.acceptedRequests,
                    pendingRequests: user.pendingRequests,
                    rejectedRequested: user.rejectedRequested,
                    occupiedLocation: user.occupiedLocation,

                }
            })

        }
    } else {
        return res.status(400).json({
            message: 'User does not exist with this email, please regsiter first!!!'
        })
    }
}


// create a user profile
exports.updateUserProfile = async (req, res) => {
    const {user, gender, profile_image, company_name, company_profile, skills, introduction } = req.body

    const skills_turned_into_array = skills.split(',').map( skill => skill.trim())

    const profileData = {}

    profileData.user = user
    profileData.gender = gender
    profileData.profile_image = profile_image
    profileData.company_name = company_name
    profileData.company_profile = company_profile
    profileData.skills = skills_turned_into_array
    profileData.introduction = introduction
    
    // check if user already created a profile
    try {
        const profile = await UserProfile.findOne({ user: profileData.user})
        if (profile) {
            const updatedProfile = await UserProfile.findByIdAndUpdate(profile._id, {"$set": {"gender": profileData.gender, "company_name": profileData.company_name, 
            "company_profile": profileData.company_profile, "skills":profileData.skills, "introduction": profileData.introduction }}, {new: true})
            return res.status(200).json({
                message: 'User profile updated.',
                profile: updatedProfile
            }) 
        } else {
            return res.status(404).json({
                message: "No user profile is available, please create one first."
            })
        }
    } catch (error) {
        return res.status(500).json({
            error: error,
            message: "No user profile found."
        })
    }
}


//create a new user profile
exports.createUserProfile = async (req, res) => {
    const {user, gender, profile_image, company_name, company_profile, skills, introduction } = req.body

    // check if user already created a profile
    try {
        const profile = await UserProfile.findOne({ user: user})
        if (profile) {
            return res.status(200).json({
                message: 'User profile already exists.',
                userProfile: profile
            }) 
        }
    } catch (error) {
        return res.status(500).json({
            error: error,
        })
    }

    // create new user profile
    const newlyCreateUserProfile = new UserProfile({ user, gender, profile_image, company_name, company_profile, skills, introduction  })

    try {
        await newlyCreateUserProfile.save()
        return res.status(200).json({
            message: 'User profile created.',
            userProfile: newlyCreateUserProfile
        })
    } catch (error) {
        return res.status(500).json({
            error: error,
        })
    }
}


//get a user profile to show on the screen
exports.getUserProfile = async (req, res) => {
    const { userID } = req.body
    if (userID) {
        try {
            const profile = await UserProfile.findOne({ user: userID }).populate('user', ['email', 'name'])
            if (profile) {
                return res.status(200).json({
                    userProfile: profile,
                    message: 'User profile received'
                })
            } else {
                return res.status(404).json({
                    message: "No user profile is available, please create one first."
                })
            }
        } catch (error) {
            return res.status(500).json({
                message: error
            })
        }
    } else {
        return res.status(403).json({
            message: "User id is not provided in request."
        })
    }
}


// delete a user profile
exports.deleteUserProfile = async (req, res) => {
    const { userID } = req.body

    if (userID) {
        try {
            const profile = await UserProfile.findOneAndDelete({ user: userID})
            if (profile) {
                return res.status(200).json({
                    message: 'User profile deleted'
                })
            } else {
                return res.status(404).json({
                    message: "No user profile is available, please create one first."
                })
            }
        } catch (error) {
            return res.status(500).json({
                error: error
            })
        }
    } else {
        return res.status(400).json({
            error: "NO user ID is provided"
        })
    }
}


//get all the user profile
exports.getAllLoggedInUsers = async (req, res) => {
    const alluser = await User.find()
    const users = []

    for ( let i = 0; i < alluser.length; i ++ ) {
        const res = await User.findById({_id: alluser[i]._id})
        users.push(res)
    }

    return res.status(200).json({
        users: users,
    })
}


//update loggedinuser table 
exports.logoutUser = async (req, res) => {
    const { user } = req.body

    if (user) {
        try {
            await LoggedInUser.findOneAndDelete({user: user})
            return res.status(200).json({
                message: 'User logged out'
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    } else {
        return res.status(400).json({
            message: "NO user ID is provided"
        })
    }
}


// change status of user
exports.changeStatus = async (req, res) => {

    // get socket io
    const io = req.app.get('socket')

    const { user, status } = req.body

    try {
        const finduser = await User.findOne({ user: user})
        if (finduser) {
            const updatestatus = await User.findByIdAndUpdate(user, {"$set": {"status": status }}, {new: true})
            
            // emit the event for client here
            let time = new Date()
            time = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()
            time = time + updatestatus.status
            io.emit('status_change', { message: `${finduser.username} has changed status just now`, current_status: time })

            return res.status(200).json({
                message: 'status updated.',
                status: updatestatus.status
            }) 
        }
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            message: "Cannot update status"
        })
    }
}


//send request 
exports.sendRequest = async (req, res) => {
    const { message, sender, receiver } = req.body
    const io = req.app.get('socket')

    //send update to receiver with request
    // build request
    const request = {message:'', sender:'', receiver:''}

    request.message = message
    request.sender = sender
    request.receiver = receiver

    try {
         // check if the same request is already exist in receiver's 'pending' or 'accepted'
         // save new request in receiver's pending list by default
         // first fine receiver
         const findReceiver = await User.findOne({ _id: request.receiver })

         if ( findReceiver.pendingRequests.includes(request.sender) || findReceiver.acceptedRequests.includes(request.sender)) {
             return res.status(200).json({
                 message: "You have already sent an request, please wait"
             })
         }

         // find sender
         const findSender = await User.findOne({ _id: request.sender })

         // update and save receiver with request
         findReceiver.pendingRequests.push(request.sender)

         // save the newlycreated request
         await findReceiver.save()

         // fire the new request event here for client
         // preparing data for event
         const new_request_data = {
            new_request_notification: `You sent a new talk request to ${findReceiver.username}`,
            request_sender: request.sender
         }

         // fire the event
         io.emit('new_request', new_request_data)

         return res.status(200).json({
             message: 'Request sending success'
         })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }

}


/*
when ever a requet come from user to a user (sender to receiver)
save it to receiver in request field (pending feild)
on accept request move it from 'pending' to 'accepted'

every time when a request arrives at SendRequest method check if its already there in receiver's pending or accepted list. if yes the refuse
the request otherwise pass it
*/

// load a single user
exports.loadSingleUser = async (req, res) => {
    const { userID } = req.body

    if ( userID ) {
        try {
            const _user = await User.findOne({ _id: userID })
            if ( _user ) {
                return res.status(200).json({
                    message: 'User found, success',
                    userProfile: _user
                })
            } else {
                return res.status(500).json({
                    message: 'User not found with this ID, please try again!'
                })
            }
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    } else {
        return res.status(400).json({
            message: 'NO user ID provided'
        })
    }
}

// this method will accept an array of user IDs and the form a new array with data associated with those user IDs
exports.sendUserDataForRequests = async (req, res) => {
    const { PendingRequests } = req.body

    if ( PendingRequests ) {
        const newUserArray = []
        try {
            for (let i = 0; i < PendingRequests.length; i ++) {
                const _user = await User.findOne({ _id: PendingRequests[i]})
                const tempUser = {
                    id: '',
                    name: ''
                }
                tempUser.id = _user._id
                tempUser.name = _user.username

                newUserArray.push(tempUser)
            }
            return res.status(200).json({
                message: 'success',
                dataForPendingRequests: newUserArray
            })
        } catch (error) {
            return res.status(200).json({
                message:'most probably you have provided invalide user ids'
            })
        }
    } else {
        return res.status(400).json({
            message: 'NO user ID array provided'
        })
    }
}


// reject request feature ( this feature will handle the request from user and the reject it )
exports.rejectRequest = async (req, res) => {
    
}


// taking up some location from the given locations
exports.occupiyARoom = async (req, res) => {
    const io = req.app.get('socket')
    const { roomid, takenBy, name } = req.body

    // preapre an object for room
    const room = {
        roomid: '',
        occupiedBy: '',
        roomName: ''
    }

    //
    room.roomName = name
    room.occupiedBy = takenBy
    room.roomid = roomid

    // find room with given ID with request
    const occupiedRoom = await RoomModel.findOne({_id: room.roomid})

    // find the user for updating their location (occupiedLocation) -> column
    const user = await User.findOne({ _id: takenBy })

    // if there is a room then proceed further
    if ( occupiedRoom ) {
        // if room is not vacant then...or else give this room to the given user ID
        if ( occupiedRoom.vacant === false ) {
            return res.status(200).json({
                message: 'This Room is already occupied, please try to enter in some other location'
            })
        } else {
            occupiedRoom.takenBy = room.occupiedBy
            occupiedRoom.vacant = false

            user.occupiedLocation = occupiedRoom._id

            await occupiedRoom.save()
            await user.save()

            const roomname = room.roomName
            io.emit('enter_new_location', roomname)

            return res.status(200).json({
                message: 'You entered into a new location.'
            })
        }
    } else {
        return res.status(500).json({
            message: 'there is no room available with this ID'
        })
    }

}


// send the list of rooms to frontend
exports.getAllTheRooms = async (req, res) => {
    const allrooms = await RoomModel.find()
    if ( allrooms ) {
        return res.status(200).json({
            rooms: allrooms
        })
    } else {
        return res.status(500).json({
            message: "Internal error"
        })
    }
}


// create a room / seat
exports.createNewRoom = async (req, res) => {
    const { name } = req.body

    if ( name ) {
        const findroom = await RoomModel.findOne({ name: name })
        if ( findroom ) {
            return res.status(400).json({
                message: 'Please provide a different name for room this room is already taken.'
            })
        } else {
            try {
                const newroom = new RoomModel({ name })
                await newroom.save()
    
                return res.status(200).json({
                    message: 'success',
                    newroom: newroom
                })
            } catch (error) {
                return res.status(500).json({
                    message: error
                })
            }
        }
    } else {
        return res.status(400).json({
            message: 'NO room name provided, please provide a room name to create a new room'
        })
    }
}


// create a new conversation api
exports.createNewConversation = async (req, res) => {
    const { sender, receiver } = req.body

    if (sender && receiver) {
        try {
            const newConversation = new Conversation({sender: sender, receiver: receiver})
            await newConversation.save()

            return res.status(200).json({
                message: 'New conversation created.'
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    } else {
        return res.status(400).json({
            message: "Please provide sender and receiver."
        })
    }
}


// create a new message
exports.newMessage = async (req, res) => {
    const { conversation, content } = req.body

    if (conversation && content) {
        try {
            const newMessage = new Message({ conversation: conversation, content: content })
            await newMessage.save()

            return res.status(200).json({
                message: 'New message created.'
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    } else {
        return res.status(400).json({
            message: "Please provide conversationId and message content."
        })
    }
}


// get all the conversation for a given user
exports.getAllConversationForAUser = async (req, res) => {
    const { userID } = req.params

    if ( userID ) {

        try {
            const conversations = await Conversation.find({sender: userID }).populate('sender', ['name', 'email']).populate('receiver', ['name', 'email'])

            return res.status(200).json({
                conversations: conversations
        })
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }

    } else {
        return res.status(400).json({
            message: "Please provider user."
        })
    }
}


// get all the message for a given conversation
exports.getAllMessagesForAConversation = async (req, res) => {
    const { conversationID } = req.params

    if (conversationID) {

        try {
            const messages = await Message.find({conversation: conversationID}).populate('conversation', ['sender', 'receiver'])
            return res.status(200).json({
                messages: messages
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }

    } else {
        return res.status(400).json({
            message: "Please provide conversationID."
        })
    }
}