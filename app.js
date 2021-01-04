const express = require('express');

const app = express();

const userRouter = require('./routes/user.js');
const matchRouter = require('./routes/match.js');

require('dotenv').config();

const badRequest = (req, res) => res.status(400).send();

app.use('/user', userRouter);

app.use('/match', matchRouter);

app.use('*', badRequest);

app.listen(9000, (err) => {
    if (err) throw err;
    console.log('\x1b[36m%s\x1b[0m', 'Server started at http://localhost:9000');
});