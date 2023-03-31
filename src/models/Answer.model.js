const mongoose = require("mongoose");

const answerSchema = mongoose.Schema(
  {
    surveyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Survey",
    },
    answers: [
      {
        value: String,
        questionId: String,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Answer", answerSchema);
