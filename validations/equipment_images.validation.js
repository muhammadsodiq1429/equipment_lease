const Joi = require("joi");

exports.equipmentImagesValidation = (body) => {
  const schema = Joi.object({
    equipment_id: Joi.number().required(),
    image_url: Joi.string().required(),
    is_main: Joi.boolean().default(false),
    description: Joi.string(),
  });

  return schema.validate(body, { abortEarly: false });
};
