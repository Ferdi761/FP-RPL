const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const signupRoutes = require("./routes/signup.js");

const app = express();
const PORT = 5000;

app.use(express.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

app.use("/signup", signupRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/home.html"));
});

// app.get()

app.listen(PORT, () => console.log("Server is running"));
