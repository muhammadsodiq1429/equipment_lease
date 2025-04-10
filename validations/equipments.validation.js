const Joi = require("joi");

exports.equipmentsValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string().trim().required(),
    model: Joi.string().trim().required(),
    price: Joi.number().required(),
    description: Joi.string().trim().optional(),
    instruction: Joi.string().trim().optional(),
    address: Joi.string().trim().optional(),
    category_id: Joi.number().required(),
    rental_rate_id: Joi.number().required(),
    owner_id: Joi.number().required(),
  });

  return schema.validate(body, { abortEarly: false });
};
