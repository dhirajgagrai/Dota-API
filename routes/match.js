const express = require('express');
const fetch = require('node-fetch');

const matchRouter = express.Router();

const methodNotAllowed = (req, res) => res.status(405).send();

matchRouter.route('/:matchid')
    .get((req, res) => {
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
    })
    .all(methodNotAllowed);

module.exports = matchRouter;