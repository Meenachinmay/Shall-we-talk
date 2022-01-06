const Joi = require('joi')

const registerValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string()
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

module.exports = { registerValidation, loginValidation }