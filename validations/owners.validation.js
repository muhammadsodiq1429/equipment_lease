const Joi = require("joi");

exports.ownerValidation = (body) => {
  const ownersSchema = Joi.object({
    first_name: Joi.string().trim().min(3).max(50).required(),
    last_name: Joi.string().trim().min(3).max(50).required(),
    phone_number: Joi.string()
      .trim()
      .required()
      .pattern(/^\+998 \d{2} \d{7}$/)
      .messages({
        "string.pattern.base":
          "Telefon raqam formati noto'g'ri! Masalan: +998 90 1234567",
      }),
    email: Joi.string().trim().email().required(),
    address: Joi.string().trim().min(10).optional(),
    company_name: Joi.string().trim().min(5).max(50).optional(),
    password: Joi.string().trim().min(8).max(50).required(),
  });
  return ownersSchema.validate(body, { abortEarly: false });
};
