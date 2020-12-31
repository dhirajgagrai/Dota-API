const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

const userRouter = require('./routes/user.js');
const matchRouter = require('./routes/match.js');

require('dotenv').config();

app.use(express.urlencoded({ extended: true }));

app.use('/user', userRouter);

app.use('/match', matchRouter);

app.listen(3000, (err) => {
    if (err) throw err;
    console.log('\x1b[36m%s\x1b[0m', 'Server started at http://localhost:3000');
});