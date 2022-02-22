const User = require("../models/User.js");
const path = require("path");

const signinPage = (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, "../public/sign.html"));
}

const checkAccount = async(req, res) =>{
    try {
        const { username, password } = req.body;
        const exist = await User.findOne({ username: username });

        if (exist) {
            if(exist.password === password){
                return res.status(200).send({ success: true,msg: "Log in success",data: exist });
            }else
                res.status(500).send({msg:"Wrong password"});
        }
      } catch (err) {
        res.status(500).json({ msg: err });
      }
}

module.exports = { signinPage, checkAccount };