const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const mongoConnect = require("./mongo.config");
const { NODE_ENV, DATABASE } = process.env;

let surveyDB;
let answerDB;
let userDB;

if (DATABASE === "lowdb") {
  surveyDB = low(new FileSync(`db/survey-${NODE_ENV}.json`));
  answerDB = low(new FileSync(`db/survey-${NODE_ENV}.json`));
  userDB = low(new FileSync(`db/survey-${NODE_ENV}.json`));
} else if (DATABASE === "mongodb") {
  mongoConnect();
}

module.exports = { surveyDB, answerDB, userDB };
