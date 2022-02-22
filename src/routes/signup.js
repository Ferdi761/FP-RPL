const express = require("express");
const router = express.Router();
const app = express();

const {
  signupPage,
  createUser,
  userData,
  updateUser,
  deleteUser,
} = require("../controller/signup.js");

app.use(express.json());

app.use(express.static(__dirname + "/public"));

router.route("/").get(signupPage).post(createUser);
router.route("/:username").get(userData).patch(updateUser).delete(deleteUser);

module.exports = router;
