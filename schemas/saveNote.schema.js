const Joi = require("joi");


const schema = Joi.object({
    title: Joi.string()
        .alphanum()
        .min(1)
        .max(50)
        .required(),

        text: Joi.string()
        .alphanum()
        .min(1)
        .max(300)
        .required()

})

module.exports = { saveNoteSchema: schema }


