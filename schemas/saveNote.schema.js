const Joi = require("joi");


const schema = Joi.object({
        username: Joi.string()
                .required(),

        title: Joi.string()
                .alphanum()
                .min(1)
                .max(50)
                .required(),

        text: Joi.string()
                .allow(' ')
                .allow('.')
                .allow(',')
                .min(1)
                .max(300)
                .required()
})

module.exports = { saveNoteSchema: schema }


