const Joi = require('joi')

// validate the registration input
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .required()
            .min(3)
            .max(32),
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .min(6)
            .max(32)
            .required()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    })

    const { error } = schema.validate(data)
    
    return error;
}

// validate the login input
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .required()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    })

    const { error } = schema.validate(data)
    
    return error;
}

// validate the user profile input
const profileValidator = (data) => {
    const schema = Joi.object({
        user: Joi.string()
            .required(),
        gender: Joi.string()
            .required(),
        profile_image: Joi.string()
            .required(),
        company_name: Joi.string()
            .required(),
        company_profile: Joi.string()
            .required(),
        skills: Joi.required(),
        introduction: Joi.string()
            .required(),
        token: Joi.string()
            .required()
        
    })

    const { error } = schema.validate(data)

    return error
}

module.exports = { registerValidation, loginValidation, profileValidator }