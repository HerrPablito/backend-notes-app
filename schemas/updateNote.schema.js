const Joi = require("joi");


const schema = Joi.object({
    noteId: Joi.string().allow('-').required(),

    title: Joi.string().allow(' ').required().min(1).max(50)

})

module.exports = { updateNoteSchema: schema }

