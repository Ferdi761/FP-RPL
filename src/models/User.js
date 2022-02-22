const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName:{
      type:String,
      required: [true, "Must have first name"]
  },
  lastName:{
      type: String,
      required: [true, "Must have last name"]
  },
  Email:{
      type: String,
      required: [true, "Must have Email"]
  },
  username:{
      type: String,
      required: [true, "Must have username"]
    //   unique: [true, "Username has been taken"]
  },
  password:{
      type: String,
      required: [true, "Must have password"]
  }

});

module.exports = mongoose.model("User", UserSchema);