// importing all the models
const User = require('../../models/User.model')
const UserProfile = require('../../models/UserProfile.model')
const Request = require ('../../models/Request.model')
const LoggedInUser = require ('../../models/loggedinuser.model')

// importing JWT for jsonwebtoken related work
const jwt = require ('jsonwebtoken')

// nodemailer is for sending emails for account activation
const nodemailer = require ('nodemailer')

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
    const { username, email, password } = req.body

    const user = await User.findOne({email: email});
    if ( user ) {
        return res.status(400).json({
            error: "Email is already taken"
        })
    }

    const token = jwt.sign({username, email, password}, process.env.JWT_ACCOUNT_ACTIVATION, {expiresIn: '60m'})

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
            <p> ${process.env.CLIENT_URL}/auth/activate/${token}</p>
            <hr />
        `
    }

    mailTransporter.sendMail(emailData)
        .then(data => {
            return res.json({
                message: "Activation link sent successfully",
                data: data
            })
        })
        .catch(err => {
            return res.json({
                error: err
            })
        })
}


//activate the account
exports.accountActivation = async (req, res) => {
    const {token} = req.body

    if (token) {
        jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, function(err, decoded){
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
        }) 

        const newuser = jwt.decode(token)

        const { username, email, password } = newuser;

        // check if account is already activated
        const checkuser = await User.findOne({email})
        if (checkuser){
            return res.status(400).json({
                error: 'Token is already used'
            })
        } else {
            const newlyCreated = new User ({username, email, password})

            try {
                await newlyCreated.save()
                return res.status(200).json({
                    message: "Sign up done, sign in now"
                })
            } catch (error) {
                return res.status(400).json({
                    error: error
                })
            }
        }
    } else {
        return res.status(400).json({
            error: "Token is invalide"
        })
    }
}


//login a user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({email: email})

    if (user) {
        // authentciate the user
        if (!user.authenticate(password)) {
            return res.status(400).json({
                error: 'Incorrect passoword, please try again'
            })
        } else {
            const newlogin = new LoggedInUser({user: user._id})
            await newlogin.save()
            // generate a token and send that to client
            const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'})

            return res.status(200).json({
                token,
                user: user
            })

        }
    } else {
        return res.status(400).json({
            error: 'User does not exist with this email, please regsiter first!!!'
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
        }
    } catch (error) {
        return res.status(500).json({
            error: error,
            message: "Opration failed"
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
    const { userid } = req.body
    if (userid) {
        try {
            const profile = await UserProfile.findOne({ user: userid }).populate('user', ['email', 'username'])
            return res.status(200).json({
                userProfile: profile,
                message: 'User profile received'
            })
        } catch (error) {
            return res.status(500).json({
                error: error
            })
        }
    }
}


// delete a user profile
exports.deleteUserProfile = async (req, res) => {
    const userID = req.body.user

    if (userID) {
        try {
            await UserProfile.findOneAndDelete({ user: userID})
            return res.status(200).json({
                message: 'User profile deleted'
            })
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
    const alluser = await LoggedInUser.find()
    const users = []

    for ( let i = 0; i < alluser.length; i ++ ) {
        const res = await User.findById({_id: alluser[i].user})
        users.push(res)
    }

    return res.status(200).json({
        users: users,
        message: 'All the user profiles'
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
                error: error
            })
        }
    } else {
        return res.status(400).json({
            error: "NO user ID is provided"
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
            error: error,
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
            error: error
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
    const { user } = req.body

    if ( user ) {
        try {
            const _user = await User.findOne({ _id: user })
            if ( _user ) {
                return res.status(200).json({
                    message: 'User found, success',
                    user: _user
                })
            } else {
                return res.status(500).json({
                    error: 'User not found with this ID, please try again!'
                })
            }
        } catch (error) {
            return res.status(400).json({
                error: error
            })
        }
    } else {
        return res.status(400).json({
            error: 'NO user ID provided'
        })
    }
}


// reject request feature ( this feature will handle the request from user and the reject it )
exports.rejectRequest = async (req, res) => {

}