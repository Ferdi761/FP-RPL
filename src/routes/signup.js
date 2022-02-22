const express = require("express");
const path = require("path");
const User = require("../models/User.js");
const router = express.Router();
const app = express();

app.use(express.json());

app.use(express.static(__dirname + "/public"));

router
  .route("/")
  .get((req, res) => {

      return res.status(200).sendFile(path.join(__dirname,"../public/form.html"));
    
    //method find ntar ngereturn data
    
  })
  .post(async (req, res) => {
    try{
      const { firstName, lastName, Email, username, password } = req.body;
      const exist = await User.findOne({username: username});
      if(exist){
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

    }catch(err){
      res.status(500).json({msg: err});
    }
  });

router
  .route("/:username")
  .get(async (req, res) => {
    try{
      const { username } = req.params;
      const user = await User.findOne({username : username});
      if(!user){
        return res.status(404).json({msg:`No account with username: ${username}`});
      }
      return res.status(200).send({ success: true, data: user });
    }catch(err){
      res.status(500).json({msg: err});
    }
  })
  .patch(async (req, res) => {
    try{
      const { username } = req.params;
      const { firstName, lastName, Email, password } = req.body;
      const user = await User.findOneAndUpdate({username: username}, req.body, {
        firstName,
        lastName,
        Email,
        password
      })
      if(!user){
        return res.status(404).json({msg:`No account with username: ${username}`});
      }
      return res.status(200).send({ success: true, data: user });
    }catch(err){
      res.status(500).json({msg: err});
    }
  })
  .delete(async (req, res) => {
    try{
      const { username } = req.params;
      const user = await User.findOneAndDelete({username: username});
      if(!user){
        return res.status(404).json({msg:`No account with username: ${username}`});
      }
      return res.status(200).send({user: null, success: true });
    }catch(err){
      res.status(500).json({msg: err});
    }
  })

module.exports = router;
