const { nanoid } = require("nanoid");
const { validateCreateSurvey } = require("../validators/survey.validator");
const { Survey } = require("../services");

module.exports = {
  createSurvey: async (req, res) => {
    const { title, questions } = req.body;

    try {
      const surveyPayload = {
        title,
        questions: questions.map((question) => ({ ...question, id: nanoid() })),
        user: req.user,
      };

      const { error } = await validateCreateSurvey(surveyPayload);

      if (error) {
        throw Error(error.message);
      }

      const survey = await Survey.create(surveyPayload);

      res.json({ message: "Survey created successfully", survey }).status(201);
    } catch (err) {
      res.json(err.message).status(400);
    }
  },

  getAllSurveys: async (req, res) => {
    try {
      const surveys = await Survey.find({ user: req.user });

      if (!surveys) {
        return res.status(400).json({ message: "Invalid survey request" });
      }

      res.json(surveys).status(200);
    } catch (err) {
      res.json(err.message).status(404);
    }
  },

  getSurveyById: async (req, res) => {
    const { surveyId } = req.params;
    const user = req.user;

    try {
      const survey = await Survey.findOne({ _id: surveyId, user });

      if (!survey) {
        return res.status(400).json({ message: "Invalid survey request" });
      }

      res.json(survey).status(200);
    } catch (err) {
      res.json(err.message).status(404);
    }
  },

  deleteSurveyById: async (req, res) => {
    const { surveyId } = req.params;
    const user = req.user;

    try {
      const survey = await Survey.findOneAndDelete({ _id: surveyId, user });

      if (!survey) {
        return res.status(400).json({ message: "Invalid delete request" });
      }

      res.json({ message: `Survey of ${survey.id} deleted successfully` });
    } catch (err) {
      res.json(err.message).status(400);
    }
  },
};
