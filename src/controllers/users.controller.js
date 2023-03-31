const { validateUser } = require("../validators/users.validator");
const { User } = require("../services");

module.exports = {
  registerUser: async (req, res) => {
    const { email } = req.body;

    try {
      const { error } = await validateUser(req.body);

      if (error) {
        throw Error(error.message);
      }

      const user = await User.create({ email });

      const token = user.generateToken();

      res
        .json({ message: "User register successfully", user, token })
        .status(201);
    } catch (err) {
      if (err.code === 11000) {
        return res.status(404).json({ message: "Already have a account" });
      }
      res.json(err.message).status(400);
    }
  },

  loginUser: async (req, res) => {
    const { email } = req.body;

    try {
      const { error } = await validateUser(req.body);

      if (error) {
        throw Error(error.message);
      }

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "Invalid login request" });
      }

      const token = user.generateToken();

      res.json({ user, token }).status(200);
    } catch (err) {
      res.json(err.message).status(400);
    }
  },
};
