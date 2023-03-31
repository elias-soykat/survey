const { lorem, internet } = require("faker");
const chai = require("chai");
const _p = require("../src/utils/asyncWrapper");
const server = require("..");
const chaiHttp = require("chai-http");
chai.use(chaiHttp); // chai plugins for api

module.exports = {
  surveyData: () => {
    return {
      title: lorem.words(10),
      questions: [
        {
          question: lorem.words(5),
          options: [lorem.words(1), lorem.words(1), lorem.words(1)],
        },
        {
          question: lorem.words(5),
          options: [lorem.words(1), lorem.words(1), lorem.words(1)],
        },
        {
          question: lorem.words(5),
          options: [lorem.words(1), lorem.words(1), lorem.words(1)],
        },
      ],
    };
  },

  answerData: () => {
    return {
      answers: [
        {
          value: lorem.words(1),
        },
        {
          value: lorem.words(1),
        },
        {
          value: lorem.words(1),
        },
      ],
    };
  },

  getRegisterToken: async () => {
    const [__, res] = await _p(
      chai
        .request(server)
        .post("/api/v1/users/register")
        .send({ email: internet.email() })
    );

    return res.body.token;
  },
};
