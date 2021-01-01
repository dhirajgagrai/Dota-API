const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

const app = express();

const userRouter = require('./routes/user.js');
const matchRouter = require('./routes/match.js');

require('dotenv').config();

const methodNotAllowed = (req, res) => res.status(400).send();

app.use(express.urlencoded({ extended: true }));

app.use('/user', userRouter);

app.use('/match', matchRouter);

app.use('*', methodNotAllowed);

app.listen(3000, (err) => {
    if (err) throw err;
    console.log('\x1b[36m%s\x1b[0m', 'Server started at http://localhost:3000');
});