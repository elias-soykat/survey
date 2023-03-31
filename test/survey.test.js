process.env.NODE_ENV = "test";

const server = require("..");
const _p = require("../src/utils/asyncWrapper");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { assert } = require("chai");
const { beforeEach } = require("mocha");
const { surveyData, getRegisterToken } = require("./utils");
const { Survey, User } = require("../src/services");

chai.use(chaiHttp); // chai plugins for api

describe("Survey test suite", () => {
  beforeEach(async () => {
    await Survey.deleteMany();
    await User.deleteMany();
  });

  it("should create a survey and get back a response", async () => {
    const token = await getRegisterToken();
    assert.exists(token, "should have jwt token for user");

    const [err, res] = await _p(
      chai
        .request(server)
        .post("/api/v1/surveys")
        .set({
          authorization: `Bearer ${token}`,
        })
        .send(surveyData())
    );

    const survey = res.body;

    assert.isNull(err, "API call error should be null");
    assert.isString(survey.message, "response should be a string of message");
    assert.isObject(survey.survey, "survey should be an object");
    assert.isString(survey.survey.title, "title should be an string");
    assert.isArray(survey.survey.questions, "questions should be an array");
  });

  it("should get survey list of object with title, and questions", async () => {
    const token = await getRegisterToken();
    assert.exists(token, "should have jwt token for user");

    await _p(
      chai
        .request(server)
        .post("/api/v1/surveys")
        .set({
          authorization: `Bearer ${token}`,
        })
        .send(surveyData())
    );

    const [err, res] = await _p(
      chai
        .request(server)
        .get("/api/v1/surveys")
        .set({
          authorization: `Bearer ${token}`,
        })
    );

    const surveys = res.body;

    assert.isNull(err, "API call error should be null");
    assert.isArray(surveys, "surveys must be an array of object");
    assert.isObject(surveys[0], "survey must be an object");
    assert.isString(surveys[0].title, "title should be a string");
    assert.isArray(surveys[0].questions, "questions should be an array");
    assert.lengthOf(surveys, 1, "surveys length must be 1");
  });

  it("should get a single survey with title, and questions", async () => {
    const token = await getRegisterToken();
    assert.exists(token, "should have jwt token for user");

    const [_, response] = await _p(
      chai
        .request(server)
        .post("/api/v1/surveys")
        .set({
          authorization: `Bearer ${token}`,
        })
        .send(surveyData())
    );

    const id = response.body.survey.id || response.body.survey._id;

    const [err, res] = await _p(
      chai
        .request(server)
        .get(`/api/v1/surveys/${id}`)
        .set({
          authorization: `Bearer ${token}`,
        })
    );

    const survey = res.body;

    assert.isNull(err, "API call error should be null");
    assert.isObject(survey, "survey must be an object with title, questions");
    assert.isString(survey.title, "title must be a string");
    assert.isArray(survey.questions, "questions must be an array of objects");
  });

  it("should delete a survey and get back a success response", async () => {
    const token = await getRegisterToken();
    assert.exists(token, "should have jwt token for user");

    const [_, response] = await _p(
      chai
        .request(server)
        .post("/api/v1/surveys")
        .set({
          authorization: `Bearer ${token}`,
        })
        .send(surveyData())
    );

    const id = response.body.survey.id || response.body.survey._id;

    const [err, res] = await _p(
      chai
        .request(server)
        .delete(`/api/v1/surveys/${id}`)
        .set({
          authorization: `Bearer ${token}`,
        })
    );

    const survey = res.body;
    assert.isNull(err, "API call error should be null");
    assert.isString(survey.message, "response should be a string of message");
  });
});
