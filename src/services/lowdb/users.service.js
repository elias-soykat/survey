const { userDB } = require("../../../db");

class User {
  constructor() {}

  async create(survey) {
    const users = await userDB.get("users").push(survey).write();
    return users[users.length - 1];
  }

  async find() {
    return await userDB.get("users").value();
  }

  async findOne(email) {
    return await userDB.findOne(email);
  }

  async findById(id) {
    const [survey] = await userDB.get("users").filter({ id }).value();
    return survey;
  }

  async findByIdAndDelete(id) {
    const [survey] = await userDB.get("users").remove({ id }).write();
    return survey;
  }

  async deleteMany(condition = {}) {
    return await userDB.get("users").remove(condition).write();
  }
}

module.exports = new User();
