const Joi = require("joi");
const validator = require("../utils/validator");

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  user: Joi.string(),
});

module.exports = {
  validateUser: validator(userSchema),
};
