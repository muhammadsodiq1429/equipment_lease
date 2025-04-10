const Joi = require("joi");

exports.equipmentStatusValidation = (body) => {
  const equipmentStatusSchema = Joi.object({
    name: Joi.string().trim().min(3).required(),
    description: Joi.string().trim().optional(),
  });
  return equipmentStatusSchema.validate(body, { abortEarly: false });
};
