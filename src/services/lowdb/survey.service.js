const { nanoid } = require("nanoid");
const { surveyDB } = require("../../../db");

class Survey {
  constructor() {}

  async create(survey) {
    const surveyWithId = { ...survey, id: nanoid() };
    const surveys = await surveyDB.get("surveys").push(surveyWithId).write();
    return surveys[surveys.length - 1];
  }

  async find() {
    return await surveyDB.get("surveys").value();
  }

  async findById(id) {
    const [survey] = await surveyDB.get("surveys").filter({ id }).value();
    return survey;
  }

  async findByIdAndDelete(id) {
    const [survey] = await surveyDB.get("surveys").remove({ id }).write();
    return survey;
  }

  async deleteMany(condition = {}) {
    return await surveyDB.get("surveys").remove(condition).write();
  }
}

module.exports = new Survey();
