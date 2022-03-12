const express = require("express");
const path = require("path");
const signupRoutes = require("./routes/signup.js");
const signinRouter = require("./routes/signin.js");
const connectDB = require("../db/connect.js");
require("dotenv").config();

const port = process.env.PORT || 3000;

const app = express();
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(express.static(__dirname + "/public"));



const start = async() => {
  try{
    await connectDB(process.env.MONGO_URI);
    app.use("/signup", signupRoutes);
    app.use("/signin", signinRouter);
    app.listen(port, console.log(`server is listening on port ${port}...`));
  }catch(error){
    console.log(error);
  }
    
};

start();
// app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
