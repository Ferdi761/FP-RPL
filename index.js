const express = require("express");
const { default: mongoose } = require("mongoose");
const path = require("path");

const app = express();
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

const start = async() => {
    mongoose.connect(
      'mongodb+srv://afdalabdallah:abdallah25@cluster0.nud19.mongodb.net/user_account?retryWrites=true&w=majority'
    );
    app.listen(3000, () => {
      console.log('Listening on http://localhost:4000');
    })
};

start();
// app.use("/signup", signupRoutes);

// app.get("/", (req, res) => {
//   res.status(200).sendFile(path.join(__dirname, "public/home.html"));
// });


// app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
