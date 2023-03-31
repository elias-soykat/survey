const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const authentication = async (req, res, next) => {
  let token;

  const hasToken =
    req.headers.authorization && req.headers.authorization.startsWith("Bearer");

  if (hasToken) {
    try {
      token = req.headers.authorization.split(" ")[1];

      jwt.verify(token, JWT_SECRET, async (err, user) => {
        if (err) {
          return res.status(403).json({ message: "Invalid token!" });
        }

        req.user = user.id;

        next();
      });
    } catch (err) {
      res.status(401).json("Not authorized!");
    }
  } else {
    res.status(403).json({ message: "Not authorized! Please add your token" });
  }
};

module.exports = authentication;
