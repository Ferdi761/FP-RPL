const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const app = express();

let users = []
app.use(express.json());

const saveUser = (data) => {
    const stringData =  JSON.stringify(data,null, '\t');
    fs.writeFileSync('./users.json', stringData);
}

const getUser = () => {
    const jsonData = fs.readFileSync('./users.json');
    return JSON.parse(jsonData);
}

app.use(express.static(__dirname+"/public"));

router.get('/', (req, res)=>{
    res.status(200).sendFile(path.join(__dirname, "../public/form.html"));
});

router.post('/', (req,res) => {
    const newUser = req.body;
    let dataUser = getUser();
    const existData = dataUser.find(user => user.username === newUser.username);

    if(existData){
        return res.status(409).send({error:true, msg:'Username already exist'});
    }

    dataUser.push(newUser);

    res.status(200).send({msg :`Account with username ${newUser.username} is created`, data : newUser});
    saveUser(dataUser);
})

//search
router.get('/:username', (req, res) => {
    const { username } = req.params;
    let dataUser = getUser();
    const foundData = dataUser.find((user) => user.username === username);

    if(!foundData){
        return res.status(409).send({error:true, msg:'Username does not exist!'});
    }

    res.status(200).send({msg: `Account with username ${username} is found!`, data:foundData});
})

router.delete('/:username', (req, res) => {
    const { username } = req.params;
    let dataUser = getUser();
    const deleteUser = dataUser.filter((user) => user.username != username);

    if(!deleteUser){
        return res.status(409).send({error:true, msg:'Username does not exist!'});
    }

    saveUser(deleteUser);
    res.status(200).send({msg : `User with username ${username} is deleted! The data base now`, data : deleteUser});
    
});

router.patch('/:username', (req, res) => {
    const { username } = req.params;
    const { firstName, lastName, Email, password} = req.body;
    let dataUser = getUser();
    const foundData = dataUser.find((user) => user.username === username);

    if(!foundData){
        return res.status(409).send({error:true, msg:'Username does not exist!'});
    }

    if(firstName){
        foundData.firstName = firstName;
    }
    if(lastName){
        foundData.lastName = lastName;
    }
    if(Email){
        foundData.Email = Email;
    }
    if(password){
        foundData.password = password;
    }
    
    saveUser(dataUser);
    console.log(`User with username ${username} has updated their account!`)
    res.status(200).send({msg:`User with username ${username} has updated their account!`, data: foundData});
    
})

module.exports = router;