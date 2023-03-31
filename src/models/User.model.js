const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const { JWT_SECRET, JWT_EXPIRE } = process.env;

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRE,
  });
};

module.exports = mongoose.model("User", userSchema);
