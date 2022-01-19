const  User = require('../../models/user.model')
const UserProfile = require('../../models/UserProfile.model')
const LoggedInUser = require ('../../models/loggedinuser.model')

const jwt = require ('jsonwebtoken')
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
                return res.json({
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
            
            const { _id, username, email, status } = user

            return res.status(200).json({
                token,
                user: {
                    _id, username, email, status
                }
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
    const { user, status } = req.body

    try {
        const finduser = await User.findOne({ user: user})
        if (finduser) {
            const updatestatus = await User.findByIdAndUpdate(user, {"$set": {"status": status }}, {new: true})
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