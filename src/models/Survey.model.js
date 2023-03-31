const mongoose = require("mongoose");

const surveySchema = new mongoose.Schema(
  {
    title: String,
    questions: [
      {
        question: String,
        options: [
          {
            type: String,
          },
        ],
      },
    ],

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Survey", surveySchema);
