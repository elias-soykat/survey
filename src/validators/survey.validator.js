const Joi = require("joi");
const validator = require("../utils/validator");

const surveySchema = Joi.object({
  title: Joi.string().min(10).max(150),
  questions: Joi.array().items(
    Joi.object({
      id: Joi.any(),
      question: Joi.string(),
      options: Joi.array(),
    })
  ),
  user: Joi.string().required(),
});

const submitSchema = Joi.object({
  surveyId: Joi.string().required(),
  answers: Joi.array().items(
    Joi.object({
      questionId: Joi.any(),
      value: Joi.required(),
      id: Joi.string(),
    })
  ),
});

module.exports = {
  validateCreateSurvey: validator(surveySchema),
  validateSubmitSurvey: validator(submitSchema),
};
