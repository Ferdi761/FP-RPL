const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const multer = require('multer');
const router = express.Router();
const app = express();
const upload = multer();

let users = []

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());
app.use(express.static(__dirname+"/public"));

router.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, "../public/signup.html"));
});


router.post('/', (req,res) => {
    const user = req.body;
    users.push(user);
    // res.send(users);
    res.send(`User with username ${user.username} added!`);
})

//search
router.get('/:username', (req, res) => {
    const { username } = req.params;
    const foundUser = users.find((user) => user.username === username)
    res.send(foundUser);
})

router.delete('/:username', (req, res) => {
    const { username } = req.params;
    users = users.filter((user) => user.username != username);
    res.send(`User with username ${username} is deleted!`);
});

router.patch('/:username', (req, res) => {
    const { username } = req.params;
    const { firstName, lastName, Email, password} = req.body;
    const user = users.find((user) => user.username === username);
    if(firstName){
        user.firstName = firstName;
    }
    if(lastName){
        user.lastName = lastName;
    }
    if(Email){
        user.Email = Email;
    }
    if(password){
        user.password = password;
    }

    res.send(`User with username ${username} has updated his account!`)
    
})

module.exports = router;