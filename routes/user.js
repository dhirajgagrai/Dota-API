const express = require('express');
const fetch = require('node-fetch');

const userRouter = express.Router();

const ApiError = require('../error/ApiError.js');

const details = require('../src/details.js');
const url = require('../src/url.js');

userRouter.route(['/:userid', '/:userid/:matchn'])
    .get((req, res, next) => {
        if (req.params.matchn && /^\d+$/.test(req.params.matchn) && req.params.matchn != '0')
            var matchn = req.params.matchn;
        else if (!req.params.matchn)
            var matchn = 10;
        else {
            const error = ApiError.badRequest('Invalid Request. Format should be /USER_ID or /USER_ID/NO_OF_MATCHES');
            next(error);
            return;
        }

        //RegExp for string containing only digits
        if (/^\d+$/.test(req.params.userid) && req.params.userid != '0') {
            fetch(`${url.matchHistory}key=${process.env.API_KEY}&account_id=${req.params.userid}&matches_requested=${matchn}`)
                .then((fetchResponse) => fetchResponse.json())
                .then((matchHistory) => {
                    //status 15 - Cannot get match history for a user that hasn't allowed it
                    if (matchHistory.result.status === 15)
                        res.status(200).json({ error: 'USER ID did not allow Public Match Data' });
                    //status 1 - Success
                    else if (matchHistory.result.status === 1) {
                        var matches = matchHistory.result.matches;
                        var promises = [];
                        matches.forEach((match, i) => {
                            promises[i] = fetch(`${url.matchDetails}key=${process.env.API_KEY}&match_id=${match.match_id}`)
                                .then((fetchResponse) => fetchResponse.json())
                                .then((matchData) => {
                                    userMatchData = (matchData.result.players.find(player => player.account_id == req.params.userid));
                                    var matchId = matchData.result.match_id;
                                    var mode = details.gameMode(matchData.result.game_mode);
                                    var lobby = details.lobbyType(matchData.result.lobby_type);
                                    var faction = details.faction(userMatchData.player_slot);
                                    var won = details.won(matchData.result.radiant_win);
                                    var result = details.result(faction, won);
                                    var abandon = details.abandon(userMatchData.leaver_status);
                                    var hero = details.heroDetail(userMatchData.hero_id);
                                    var kills = userMatchData.kills;
                                    var deaths = userMatchData.deaths;
                                    var assists = userMatchData.assists;
                                    var duration = details.duration(matchData.result.duration);

                                    var match_data = {
                                        "matchid": matchId,
                                        "mode": mode,
                                        "lobby": lobby,
                                        "faction": faction,
                                        "result": result,
                                        "abandon": abandon,
                                        "hero": hero,
                                        "kills": kills,
                                        "deaths": deaths,
                                        "assists": assists,
                                        "duration": duration
                                    };

                                    return match_data;
                                });
                        });
                        Promise.all(promises).then(data => res.status(200).json(data));
                    }
                });
        }
        else {
            const error = ApiError.notFound('USER ID not found');
            next(error);
        }
    })
    .all((req, res, next) => {
        const error = ApiError.methodNotAllowed('Operation not allowed');
        next(error);
    });

module.exports = userRouter;