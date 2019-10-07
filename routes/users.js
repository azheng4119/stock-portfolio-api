const express = require('express');
const bodyParser = require('body-parser')
const users = express();
const UserModel = require('../database/models/user')
const md5 = require('blueimp-md5')
users.use(bodyParser.json())


users.get('/:user', async (req, res, next) => {
    const userId = req.params.user
    let data = await UserModel.findOne({
        where: {
            email: userId
        },
        attributes: {
            exclude: ['password', 'id']
        }
    }).then(user => user).catch(error => null);
    if (data) {
        res.status(200).send(data)
    } else {
        res.status(400).send();
    }
})

users.put('/:user', async (req, res, next) => {
    const userId = req.params.user
    const newData = req.body
    let status = await UserModel.update(
        newData
    ,
        {
            returning : true,
            where: {
                email: userId
            },
        }).then().catch(err => console.log(err));
    if (status){
        res.status(200).send('ok')
    }else{
        res.status(400).send()
    }
})


users.post('/login', async (req, res, next) => {
    console.log(req.body);
    await UserModel.findOne({
        where: { email: req.body.email, password: req.body.password }
    }).then(project => {
        if (project !== null) res.status(200).send("Success");
    })
    res.status(400).send("Denied");
})

users.post('/register', async (req, res, next) => {
    const userData = req.body;
    userData.password = md5(userData.password);
    let created = await UserModel.findOrCreate({
        where: { email: req.body.email },
        defaults: userData
    }).then(([user, created]) => created)
    if (!created) {
        res.status(400).send("Email In Use");
    } else {
        res.status(200).send(userData)
    }
})


module.exports = users