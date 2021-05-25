const joi = require('joi');

module.exports.registerValidation = data => {
    const schema = joi.object({
        email: joi.string()
            .min(6)
            .email()
            .required(),
        password: joi.string()
            .min(6)
            .required(),
        name: joi.string()
            .min(6)
            .required(),
        surname: joi.string()
            .min(6)
            .required()
    });

    return schema.validate(data);
}

module.exports.loginValidation = data => {
    const schema = joi.object({
        email: joi.string()
            .min(6)
            .required()
            .email(),
        password: joi.string()
            .min(6)
            .required()
    });

    return schema.validate(data);
}