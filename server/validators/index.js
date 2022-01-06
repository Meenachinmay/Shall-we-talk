const { registerValidation, loginValidation } = require('./authValidators')

exports.runvalidator = (req, res, next) => {
    const error = registerValidation(req.body)

    if (error) {
        return res.status(422).json({
            error: error.details[0].message
        })
    }

    next()
}

exports.loginValidator = (req, res, next) => {
    const error = loginValidation (req.body)

    if (error) {
        return res.status(422).json({
            error: error.details[0].message
        })
    }

    next()
}