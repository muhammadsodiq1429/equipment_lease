const Joi = require("joi");

exports.adminsValidation = (body) => {
  const adminsSchema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().trim().required().email(),
    full_name: Joi.string().min(10).max(100).required(),
    hashed_password: Joi.string()
      .min(8)
      .max(50)
      .required()
      // .pattern(
      //   new RegExp(
      //     "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{6,255}$"
      //   )
      // )
      .required(),
    is_active: Joi.boolean().default(false),
    is_creator: Joi.boolean().default(false),
  });

  return adminsSchema.validate(body, { abortEarly: false });
};
