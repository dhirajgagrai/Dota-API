const ApiError = require('./ApiError.js');

const errorHandler = (error, req, res, next) => {
    if (error instanceof ApiError) {
        res.status(error.code).send({ error: error.message });
        return;
    }

    res.status(500).send({ error: 'Something went wrong' });
    console.error(error);
};

module.exports = errorHandler;