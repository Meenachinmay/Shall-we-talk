const { registerValidation, loginValidation, profileValidator } = require('./authValidators')

// validate the register request
exports.runvalidator = (req, res, next) => {
    const error = registerValidation(req.body)

    if (error) {
        return res.status(422).json({
            message: error.details[0].message
        })
    }

    next()
}

// validate the login request
exports.loginValidator = (req, res, next) => {
    const error = loginValidation (req.body)

    if (error) {
        return res.status(422).json({
            message: error.details[0].message
        })
    }

    next()
}

// validate the user profile data
exports.userProfileDataValidator = (req, res, next) => {
    const error = profileValidator(req.body)

    if (error) {
        return res.status(422).json({
            message: error.details[0].message
        })
    }

    next()
}