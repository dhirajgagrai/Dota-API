const express = require('express');
const fetch = require('node-fetch');

const matchRouter = express.Router();

const details = require('../src/details.js');
const url = require('../src/url.js')

const methodNotAllowed = (req, res) => res.status(405).send();

matchRouter.route('/:matchid')
    .get((req, res) => {
        if (/^\d+$/.test(req.params.matchid) && req.params.matchid != '0') {
            fetch(`${url.matchDetails}?key=${process.env.API_KEY}&match_id=${req.params.matchid}`)
                .then((fetchResponse) => fetchResponse.json())
                .then((matchData) => {
                    var playerData = [];
                    matchData.result.players.forEach((player, i) => {
                        var id = player.account_id;
                        var faction = details.faction(player.player_slot);
                        var slot = details.slot(player.player_slot);
                        var hero = details.heroDetail(player.hero_id);
                        var item = [];
                        item[0] = details.itemDetail(player.item_0);
                        item[1] = details.itemDetail(player.item_1);
                        item[2] = details.itemDetail(player.item_2);
                        item[3] = details.itemDetail(player.item_3);
                        item[4] = details.itemDetail(player.item_4);
                        item[5] = details.itemDetail(player.item_5);
                        item[6] = details.itemDetail(player.backpack_0);
                        item[7] = details.itemDetail(player.backpack_1);
                        item[8] = details.itemDetail(player.backpack_2);
                        item[9] = details.itemDetail(player.item_neutral);
                        var kills = player.kills;
                        var deaths = player.deaths;
                        var assists = player.assists;
                        var abandon = details.abandon(player.leaver_status);
                        var lasthits = player.last_hits;
                        var denies = player.denies;
                        var gpm = player.gold_per_min;
                        var xpm = player.xp_per_min;
                        var level = player.level;
                        var hDmg = player.hero_damage;
                        var tDmg = player.tower_damage;
                        var heal = player.hero_healing;
                        var gold = player.gold;
                        var goldSpent = player.gold_spent;
                        playerData[i] = {
                            "account_id": id,
                            "faction": faction,
                            "player_slot": slot,
                            "hero": hero,
                            "item_0": item[0],
                            "item_1": item[1],
                            "item_2": item[2],
                            "item_3": item[3],
                            "item_4": item[4],
                            "item_5": item[5],
                            "backpack_0": item[6],
                            "backpack_1": item[7],
                            "backpack_2": item[8],
                            "item_neutral": item[9],
                            "kills": kills,
                            "deaths": deaths,
                            "assists": assists,
                            "abandon": abandon,
                            "last_hits": lasthits,
                            "denies": denies,
                            "gold_per_min": gpm,
                            "xp_per_min": xpm,
                            "level": level,
                            "hero_damage": hDmg,
                            "tower_damage": tDmg,
                            "hero_healing": heal,
                            "gold": gold,
                            "gold_spent": goldSpent
                        }
                    });
                    var picksbans = [];
                    matchData.result.picks_bans.forEach((pb, i) => {
                        if (pb.is_pick)
                            var action = 'pick';
                        else
                            var action = 'ban';
                        var heroDetail = details.heroDetail(pb.hero_id);
                        if (pb.team)
                            var team = 'Dire';
                        else
                            var team = 'Radiant';
                        var order = pb.order;
                        picksbans[i] = {
                            "action": action,
                            "hero": heroDetail,
                            "team": team,
                            "order": order
                        }
                    });
                    var mode = details.gameMode(matchData.result.game_mode);
                    var lobby = details.lobbyType(matchData.result.lobby_type);
                    var won = details.won(matchData.result.radiant_win);
                    var rScore = matchData.result.radiant_score;
                    var dScore = matchData.result.dire_score;
                    var duration = details.duration(matchData.result.duration);
                    var rTower = details.tower(matchData.result.tower_status_radiant);
                    var dTower = details.tower(matchData.result.tower_status_dire);
                    var rBarracks = details.barracks(matchData.result.barracks_status_radiant);
                    var dBarracks = details.barracks(matchData.result.barracks_status_dire);

                    var data = {
                        "players": playerData,
                        "mode": mode,
                        "lobby": lobby,
                        "won": won,
                        "radiant_score": rScore,
                        "dire_score": dScore,
                        "duration": duration,
                        "radiant_tower": rTower,
                        "radiant_barracks": rBarracks,
                        "dire_tower": dTower,
                        "dire_barracks": dBarracks,
                        "picks_bans": picksbans
                    }

                    res.statusCode = 200;
                    res.json(data);
                });
        }
        else
            res.send('MATCH ID not found');
    })
    .all(methodNotAllowed);

module.exports = matchRouter;