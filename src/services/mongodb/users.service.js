const User = require("../../models/User.model");

exports.create = (user) => {
  return User.create(user);
};

exports.find = () => {
  return User.find();
};

exports.findOne = ({ email }) => {
  return User.findOne({ email });
};

exports.findById = ({ id }) => {
  return User.findById({ id }).exec();
};

exports.findByIdAndDelete = ({ id }) => {
  return User.findByIdAndDelete({ id });
};

exports.deleteMany = () => {
  return User.deleteMany({});
};
