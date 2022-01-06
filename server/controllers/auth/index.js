const  User = require('../../models/user.model')
const jwt = require ('jsonwebtoken')
const sendgrid = require ('@sendgrid/mail')

const nodemailer = require ('nodemailer')

sendgrid.setApiKey(process.env.SENDGRID_API_KEY)

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
            // generate a token and send that to client
            const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'})
            
            const { _id, username, email, role } = user

            return res.status(200).json({
                token,
                user: {
                    _id, username, email, role
                }
            })

        }
    } else {
        return res.status(400).json({
            error: 'User does not exist with this email, please regsiter first!!!'
        })
    }
}