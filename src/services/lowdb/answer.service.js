const { nanoid } = require("nanoid");
const { answerDB } = require("../../../db");

class Answer {
  constructor() {}

  async create(answers) {
    const answerWithId = { ...answers, id: nanoid() };
    const surveys = await answerDB.get("submit").push(answerWithId).write();
    return surveys[surveys.length - 1];
  }

  async find() {
    return await answerDB.get("submit").value();
  }

  async findById(id) {
    const [survey] = await answerDB.get("submit").filter({ id }).value();
    return survey;
  }

  async findByIdAndDelete(id) {
    const [survey] = await answerDB.get("submit").remove({ id }).write();
    return survey;
  }

  async deleteMany(condition = {}) {
    return await answerDB.get("submit").remove(condition).write();
  }
}

module.exports = new Answer();
