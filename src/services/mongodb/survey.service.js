const Survey = require("../../models/Survey.model");

exports.create = (survey) => {
  return Survey.create(survey);
};

exports.find = ({ user }) => {
  return Survey.find({ user });
};

exports.findOne = ({ _id, user }) => {
  return Survey.findOne({ _id, user });
};

exports.findById = (surveyId) => {
  return Survey.findById(surveyId);
};

exports.findOneAndDelete = ({ _id, user }) => {
  return Survey.findOneAndDelete({ _id, user });
};

exports.deleteMany = () => {
  return Survey.deleteMany({});
};
