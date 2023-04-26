const Joi = require("joi");


const schema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(1)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'se'] } })
        .required()

})

module.exports = { signupSchema: schema }


