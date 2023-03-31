require("../../db");

const databases = {
  lowdb: {
    Survey: require("./lowdb/survey.service"),
    Answer: require("./lowdb/answer.service"),
    User: require("./lowdb/users.service"),
  },
  mongodb: {
    Survey: require("./mongodb/survey.service"),
    Answer: require("./mongodb/answer.service"),
    User: require("./mongodb/users.service"),
  },
};

module.exports = databases[process.env.DATABASE];
