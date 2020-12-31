const express = require('express');
const fetch = require('node-fetch');

const userRouter = express.Router();

const matchDetail = require('../src/match-details.js');
const url = require('../src/url.js')

const methodNotAllowed = (req, res) => res.status(405).send();

userRouter.route(['/:userid', '/:userid/:matchn'])
    .get((req, res) => {
        var matchn = 10;
        if (req.params.matchn && /^\d+$/.test(req.params.matchn) && req.params.matchn != '0')
            matchn = req.params.matchn;
        else {
            res.statusCode = 400;
            res.end('Request should be of format /:USER_ID or /:USER_ID/:NO_OF_MATCHES');
        }

        //RegExp for string containing only digits
        if (/^\d+$/.test(req.params.userid) && req.params.userid != '0') {
            fetch(`${url.matchHistory}?key=${process.env.API_KEY}&account_id=${req.params.userid}&matches_requested=${matchn}`)
                .then((fetchResponse) => fetchResponse.json())
                .then((matchHistory) => {
                    //status 15 - Cannot get match history for a user that hasn't allowed it
                    if (matchHistory.result.status === 15) {
                        res.statusCode = 204;
                        res.end('Public Match Data not available for this USER ID');
                    }
                    //status 1 - Success
                    else if (matchHistory.result.status === 1)
                        return (matchHistory.result.matches);
                })
                .then((matches) => {
                    var promises = [];
                    matches.forEach((match, i) => {
                        promises[i] = fetch(`${url.matchDetails}?key=${process.env.API_KEY}&match_id=${match.match_id}`)
                            .then((fetchResponse) => fetchResponse.json())
                            .then((matchData) => {
                                userMatchData = (matchData.result.players.find(player => player.account_id == req.params.userid));
                                var matchid = matchData.result.match_id;
                                var mode = matchDetail.gameMode(matchData.result.game_mode);
                                var lobby = matchDetail.lobbyType(matchData.result.lobby_type);
                                var faction = matchDetail.faction(userMatchData.player_slot);
                                var won = matchDetail.won(matchData.result.radiant_win);
                                var result = matchDetail.result(faction, won);
                                var abandon = matchDetail.abandon(userMatchData.leaver_status);
                                var hero = matchDetail.heroDetail(userMatchData.hero_id);
                                var kills = userMatchData.kills;
                                var deaths = userMatchData.deaths;
                                var assists = userMatchData.assists;
                                var duration = matchDetail.duration(matchData.result.duration);
                                var match_data = {
                                    "matchid": matchid,
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
                            })
                    });
                    Promise.all(promises).then((data) => {
                        res.statusCode = 200;
                        res.json(data)
                    });
                })
        }
        else {
            res.statusCode = 404;
            res.end('USER ID not found');
        }
    })
    .all(methodNotAllowed);

module.exports = userRouter;