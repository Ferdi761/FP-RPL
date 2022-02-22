const express = require("express");
const mongoose= require("mongoose");
const path = require("path");
const signupRoutes = require("./routes/signup.js");
const signinRouter = require("./routes/signin.js");

const app = express();
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(express.static(__dirname + "/public"));



const start = async() => {
    mongoose.connect(
      //tak ganti <password> biar gk keliatan pass ku :3

      'mongodb://<username>:<password>@cluster0-shard-00-00.nud19.mongodb.net:27017,cluster0-shard-00-01.nud19.mongodb.net:27017,cluster0-shard-00-02.nud19.mongodb.net:27017/user_account?ssl=true&replicaSet=atlas-8bj6lu-shard-0&authSource=admin&retryWrites=true&w=majority'
    );
    app.use("/signup", signupRoutes);
    app.use("/signin", signinRouter);
    app.get("/", (req, res) => {
      res.status(200).sendFile(path.join(__dirname, "./public/home.html"));
    });
    app.listen(3000, () => {
      console.log('Listening on http://localhost:3000');
    })
    
};

start();




// app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
