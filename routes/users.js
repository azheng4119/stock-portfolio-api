const express = require('express');
const bodyParser = require('body-parser')
const users = express();
const UserModel = require('../database/models/user')
const md5 = require('blueimp-md5')
users.use(bodyParser.json())


users.post('/register', async (req,res,next) => {
    const userData = req.body;
    userData.password = md5(userData.password);
    let created = await  UserModel.findOrCreate({
        where : {email : req.body.email}, 
        defaults : userData
    }).then(([user, created]) => created)
    if (!created){
        res.status(400).send("Email In Use");
    }else{
        res.status(200).send(userData)
    }
})


module.exports = users