const Joi = require("joi");

exports.contractStatusValidation = (body) => {
  const contractStatusSchema = Joi.object({
    name: Joi.string().trim().min(3).required(),
    description: Joi.string().trim().optional(),
  });
  return contractStatusSchema.validate(body, { abortEarly: false });
};
