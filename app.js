const express = require('express');
const app = express();

const userRouter = require('./routes/user.js');
const matchRouter = require('./routes/match.js');

const ApiError = require('./error/ApiError.js');
const errorHandler = require('./error/errorHandler.js');

require('dotenv').config();

app.use('/user', userRouter);

app.use('/match', matchRouter);

app.use('*', (req, res, next) => {
    const error = ApiError.badRequest('Invalid request');
    next(error);
});

app.use(errorHandler);

app.listen(9000, (err) => {
    if (err) throw err;
    console.log('\x1b[36m%s\x1b[0m', 'Server started at http://localhost:9000');
});