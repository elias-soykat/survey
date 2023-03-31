const router = require("express").Router();

const user = require("../controllers/users.controller");

router.route("/register").post(user.registerUser);
router.route("/login").post(user.loginUser);

module.exports = router;
