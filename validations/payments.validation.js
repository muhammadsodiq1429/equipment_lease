const Joi = require("joi");

exports.paymentsValidation = (body) => {
  const schema = Joi.object({
    contract_id: Joi.number().required(),
    status_id: Joi.number().required(),
    amount: Joi.number().required(),
    date: Joi.date().required(),
    method: Joi.string()
      .valid("card", "credit_card", "bank_transfer", "cash", "other")
      .required(),
  });

  return schema.validate(body, { abortEarly: false });
};
