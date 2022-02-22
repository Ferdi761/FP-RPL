const User = require("../models/User.js");
const path = require("path");

const signupPage = (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, "../public/form.html"));
};

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, Email, username, password } = req.body;
    const exist = await User.findOne({ username: username });
    if (exist) {
      return res.status(500).send(`Username ${username} has been taken`);
    }
    const user = await User.create({
      firstName,
      lastName,
      Email,
      username,
      password,
    });

    return res.status(200).send({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const userData = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username: username });
    if (!user) {
      return res
        .status(404)
        .json({ msg: `No account with username: ${username}` });
    }
    return res.status(200).send({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const updateUser = async (req, res) => {
  try {
    const { username } = req.params;
    const { firstName, lastName, Email, password } = req.body;
    const user = await User.findOneAndUpdate({ username: username }, req.body, {
      firstName,
      lastName,
      Email,
      password,
    });
    if (!user) {
      return res
        .status(404)
        .json({ msg: `No account with username: ${username}` });
    }
    return res.status(200).send({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOneAndDelete({ username: username });
    if (!user) {
      return res
        .status(404)
        .json({ msg: `No account with username: ${username}` });
    }
    return res.status(200).send({ user: null, success: true });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

module.exports = { signupPage, createUser, userData, updateUser, deleteUser };
