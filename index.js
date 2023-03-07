const express = require('express');
const mongodb = require('mongoose');
const User=require('./models/User');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();
//console.log(process.env.MONGO_URL);
mongodb.connect(process.env.MONGO_URL);
const jwtSecret = process.env.JWT_SECRET;
const app = express();

app.get('/test',(req,res)=>{
    res.json('test ok');
});

app.post('/register', async(req,res)=>{
    const {username,password} =req.body;
    const createdUser = await User.create({username,password});
    jwt.sign({userId:createdUser._id},jwtSecret,(err,token)=>{
        if (err) throw err;
        res.cookie('token',token).status(201).json('ok');
    });
});

app.listen(3999);