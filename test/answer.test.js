process.env.NODE_ENV = "test";

const server = require("..");
const _p = require("../src/utils/asyncWrapper");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { assert } = require("chai");
const { beforeEach } = require("mocha");
const { surveyData, answerData, getRegisterToken } = require("./utils");
const { Survey, Answer, User } = require("../src/services");

chai.use(chaiHttp); // chai plugins for http test

describe("Survey Answer test suite", () => {
  beforeEach(async () => {
    await Survey.deleteMany();
    await Answer.deleteMany();
    await User.deleteMany();
  });

  it("should answer a survey and send a success response", async () => {
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
        .post(`/api/v1/surveys/${id}/answers`)
        .send(answerData())
    );

    const answer = res.body;
    assert.isNull(err, "API call error should be null");
    assert.isString(answer.message, "should be a string of success message");
    assert.isObject(answer.results, "result must be an object");
  });

  it("should get a answers list of a survey", async () => {
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

    await _p(
      chai
        .request(server)
        .post(`/api/v1/surveys/${id}/answers`)
        .send(answerData())
    );

    const [err, res] = await _p(
      chai
        .request(server)
        .get(`/api/v1/surveys/${id}/answers`)
        .set({
          authorization: `Bearer ${token}`,
        })
    );

    const answer = res.body;

    assert.isNull(err, "API call error should be null");
    assert.isArray(answer, "answer answer should an array of list");
    assert.isObject(answer[0], "answer must be an object");
    assert.isString(answer[0].surveyId, "surveyId should be a string");
    assert.isArray(answer[0].answers, "answers should be an array object");
    assert.lengthOf(answer, 1, "answer length must be 1");
  });
});
