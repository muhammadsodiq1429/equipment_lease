const Joi = require("joi")

module.exports = (password) => {

  return Joi.object({
    password: Joi.string().min(8).max(50).required()
  }).validate(password)
}