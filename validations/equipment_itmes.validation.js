const Joi = require("joi");

exports.equipmentItemsValidation = (body) => {
  const schema = Joi.object({
    equipment_id: Joi.number().required(),
    serial_number: Joi.string().required(),
    status_id: Joi.number().required(),
  });

  return schema.validate(body, { abortEarly: false });
};
