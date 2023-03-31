const Answer = require("../../models/Answer.model");

exports.create = (answers) => {
  return Answer.create(answers);
};

exports.find = () => {
  return Answer.find();
};

exports.findById = (answerId) => {
  return Answer.findById(answerId).exec();
};

exports.findByIdAndDelete = (answerId) => {
  return Answer.findByIdAndDelete(answerId);
};

exports.deleteMany = () => {
  return Answer.deleteMany({});
};
