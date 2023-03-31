const router = require("express").Router();

const authentication = require("../middleware/authentication.middleware");
const survey = require("../controllers/survey.controller");
const answer = require("../controllers/answer.controller");

router.route("/").post(authentication, survey.createSurvey);
router.route("/").get(authentication, survey.getAllSurveys);
router.route("/:surveyId").get(authentication, survey.getSurveyById);
router.route("/:surveyId").delete(authentication, survey.deleteSurveyById);

router.route("/:surveyId/answers").post(answer.submitAnswer);
router.route("/:surveyId/answers").get(answer.getAllAnswers);
router
  .route("/:surveyId/answers/:answerId")
  .get(authentication, answer.getAnswerById);
router
  .route("/:surveyId/answers/:answerId")
  .delete(authentication, answer.deleteAnswerById);

module.exports = router;
