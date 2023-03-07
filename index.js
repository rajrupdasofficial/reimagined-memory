const express = require('express');
const mongodb = require('mongoose');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const cors = require ('cors');

const dotenv = require('dotenv');
dotenv.config();

mongodb.connect(process.env.MONGO_URL);

const jwtSecret = process.env.JWT_SECRET;

const app = express();
app.use(cors({
    credentials:true,
    origin:process.env.CLIENT_URL,
}));

app.use(express.json());

app.get('/test', (req, res) => {
    res.json('test ok');
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const createdUser = await User.create({ username, password });
    jwt.sign({ userId: createdUser._id }, jwtSecret, (err, token) => {
        if (err) throw err;
        res.cookie('token', token).status(201).json('ok');
    });
});

app.listen(3999);
