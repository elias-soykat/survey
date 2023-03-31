const { validateSubmitSurvey } = require("../validators/survey.validator");
const { Survey, Answer } = require("../services");

module.exports = {
  submitAnswer: async (req, res) => {
    const { surveyId } = req.params;
    const { answers } = req.body;

    try {
      // const surveys = await Survey.find({ user: req.user });

      // exchange survey question id to submit answers questionId
      // surveys.forEach(({ questions }) => {
      //   questions.forEach((question, i) => {
      //     return (answers[i].questionId = question.id);
      //   });
      // });

      const survey = await Survey.findById(surveyId);

      if (!survey) {
        throw Error(`There is no survey exist in this ${surveyId}`);
      }
      const checkAnswer = await Answer.find();
      const isAlreadyAnswer = await checkAnswer.some(
        (answer) => answer.surveyId.toString() === surveyId
      );

      if (isAlreadyAnswer) {
        throw Error("Already answered this survey");
      }

      const { error } = await validateSubmitSurvey({ surveyId, ...req.body });

      if (error) {
        throw Error(error.message);
      }

      const results = await Answer.create({ surveyId, ...req.body });

      res.json({ message: "Survey answer successfully", results }).status(200);
    } catch (err) {
      res.json(err.message).status(400);
    }
  },

  getAllAnswers: async (req, res) => {
    const { surveyId } = req.params;

    try {
      const survey = await Survey.findById(surveyId);
      if (!survey) {
        throw Error(`There is no survey exist in this ${surveyId}`);
      }

      const answers = await Answer.find();

      return res.json(answers).status(200);
    } catch (err) {
      res.json(err.message).status(400);
    }
  },

  getAnswerById: async (req, res) => {
    const { surveyId, answerId } = req.params;

    try {
      const survey = await Survey.findById(surveyId);

      if (!survey) {
        throw Error(`There is no survey exist in this ${surveyId}`);
      }

      const answer = await Answer.findById(answerId);

      res.json(answer).status(200);
    } catch (err) {
      res.json(err.message).status(400);
    }
  },

  deleteAnswerById: async (req, res) => {
    const { surveyId, answerId } = req.params;

    try {
      const survey = await Survey.findById(surveyId);
      if (!survey) {
        throw Error(`There is no survey exist in this ${surveyId}`);
      }

      await Answer.findByIdAndDelete(answerId);

      res.json(`Answer of ${answerId} deleted successfully`);
    } catch (err) {
      res.json(err.message).status(400);
    }
  },
};
