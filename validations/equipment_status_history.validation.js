const Joi = require("joi");

exports.equipmentStatusHistoryValidation = (body) => {
  const equipmentStatusHistorySchema = Joi.object({
    equipment_item_id: Joi.number().integer().required(),
    old_status_id: Joi.number().integer().required(),
    new_status_id: Joi.number().integer().required(),
    changed_by_user_id: Joi.number().integer().required(),
    changed_by_role: Joi.string().required(),
  });
  return equipmentStatusHistorySchema.validate(body, { abortEarly: false });
}