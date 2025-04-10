const Joi = require("joi");

exports.paymentStatusValidation = (body) => {
  const paymentStatusSchema = Joi.object({
    name: Joi.string().trim().min(3).required(),
    description: Joi.string().trim().optional(),
  });
  return paymentStatusSchema.validate(body, { abortEarly: false });
};
