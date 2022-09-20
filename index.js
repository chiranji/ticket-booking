const mongoose = require('mongoose');
const express = require('express');
const cors = require("cors");
require('./config');
const users = require('./model/users');

const app = express();
app.use( cors({
    origin: "*",
  }),express.json());

app.post('/signup', async (req, resp, next)=>{
    let userdata = new users(req.body);
    userdata.username = req.body.name.slice(0,2)+req.body.password.slice(-4);
    let result = await userdata.save();
    resp.header("Access-Control-Allow-Origin", "*");
    resp.send(result);
    next();
});

app.post('/login', async (req, resp, next)=>{
    if(req.body.email && req.body.password){
        let data = await users.findOne(req.body).select('username');
        if(data){
                resp.send(data);
                next();
        }else{
            resp.send({status: 'no user found !!'});
            next();
        }
    }else{
        resp.send({status: 'Something wrong !!'});
        next();
    }

});


app.listen(4500);