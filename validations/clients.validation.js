const Joi = require("joi");

exports.clientsValidation = (body) => {
  const clientsSchema = Joi.object({
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
    password: Joi.string().trim().min(8).max(50).required(),
    passport_serial_number: Joi.string()
      .trim()
      .uppercase()
      .length(9)
      .pattern(/^[A-Z]{2}\d{7}$/)
      .required()
      .messages({
        "string.pattern.base":
          "Passport seriya raqami noto'g'ri! Masalan: AA1234567",
        "string.length":
          "Passport seriya raqami 9 ta belgidan iborat bo'lishi kerak",
      }),
  });
  return clientsSchema.validate(body, { abortEarly: false });
};
