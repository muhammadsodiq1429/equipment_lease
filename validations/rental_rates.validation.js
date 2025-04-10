const Joi = require("joi");

exports.rentalRatesValidation = (body) => {
  const rentalRatesSchema = Joi.object({
    name: Joi.string().trim().min(3).required(),
    price: Joi.number().required(),
});
  return rentalRatesSchema.validate(body, { abortEarly: false });
};
