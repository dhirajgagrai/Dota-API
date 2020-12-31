const express = require('express');
const fetch = require('node-fetch');

const matchRouter = express.Router();

matchRouter.route('/:matchid')
    .get((req, res) => {
        //RegExp for string containing only digits
        if (/^\d+$/.test(req.params.matchid) && req.params.matchid != '0') {
            fetch(`http://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/v1?key=${process.env.API_KEY}&match_id=${req.params.matchid}`)
                .then((fetchResponse) => fetchResponse.json())
                .then((matchData) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.send(matchData);
                });
        }
        else
            res.send('You need to enter a valid match ID');
    });

module.exports = matchRouter;