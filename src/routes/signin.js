const express = require("express");
const router = express.Router();
const app = express();

const {
  signinPage, checkAccount
} = require("../controller/signin.js");

app.use(express.json());

app.use(express.static(__dirname + "/public"));

router.route("/").get(signinPage).post(checkAccount);
// router.route("/:username").get(userData).patch(updateUser).delete(deleteUser);

module.exports = router;
