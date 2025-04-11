const Joi = require("joi");
exports.contractsValidation = (body) => {
  const schema = Joi.object({
    equipment_item_id: Joi.number().required(),
    client_id: Joi.number().required(),
    owner_id: Joi.number().required(),
    status_id: Joi.number().required(),
    total_amount: Joi.number().required(),
    terms_and_conditions: Joi.string().trim().optional(),
    description: Joi.string().trim().optional(),
    start_date: Joi.date().required(),
    end_date: Joi.date().required(),
  });

  return schema.validate(body, { abortEarly: false });
}