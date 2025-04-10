const Joi = require("joi");

exports.categoryValidation = (body) => {
  const categorySchema = Joi.object({
    name: Joi.string().trim().min(3).required(),
    description: Joi.string().trim().optional(),
});
  return categorySchema.validate(body, { abortEarly: false });
};
 