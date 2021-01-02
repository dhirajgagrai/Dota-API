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
                        var hero = details.heroName(player.hero_id);
                        var small_portrait = details.heroImage(player.hero_id, 'small');
                        var full_portrait = details.heroImage(player.hero_id, 'full');
                        var vert_portrait = details.heroImage(player.hero_id, 'vert');
                        var item = [];
                        var image = [];
                        item[0] = details.itemName(player.item_0);
                        image[0] = details.itemImage(player.item_0);
                        item[1] = details.itemName(player.item_1);
                        image[1] = details.itemImage(player.item_1);
                        item[2] = details.itemName(player.item_2);
                        image[2] = details.itemImage(player.item_2);
                        item[3] = details.itemName(player.item_3);
                        image[3] = details.itemImage(player.item_3);
                        item[4] = details.itemName(player.item_4);
                        image[4] = details.itemImage(player.item_4);
                        item[5] = details.itemName(player.item_5);
                        image[5] = details.itemImage(player.item_5);
                        item[6] = details.itemName(player.backpack_0);
                        image[6] = details.itemImage(player.backpack_0);
                        item[7] = details.itemName(player.backpack_1);
                        image[7] = details.itemImage(player.backpack_1);
                        item[8] = details.itemName(player.backpack_2);
                        image[8] = details.itemImage(player.backpack_2);
                        item[9] = details.itemName(player.item_neutral);
                        image[9] = details.itemImage(player.item_neutral);
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
                            "hero": {
                                "name": hero,
                                "small_portrait": small_portrait,
                                "full_portrait": full_portrait,
                                "vertical_portrait": vert_portrait
                            },
                            "item_0": {
                                "name": item[0],
                                "image": image[0]
                            },
                            "item_1": {
                                "name": item[1],
                                "image": image[1]
                            },
                            "item_2": {
                                "name": item[2],
                                "image": image[2]
                            },
                            "item_3": {
                                "name": item[3],
                                "image": image[3]
                            },
                            "item_4": {
                                "name": item[4],
                                "image": image[4]
                            },
                            "item_5": {
                                "name": item[5],
                                "image": image[5]
                            },
                            "backpack_0": {
                                "name": item[6],
                                "image": image[6]
                            },
                            "backpack_1": {
                                "name": item[7],
                                "image": image[7]
                            },
                            "backpack_2": {
                                "name": item[8],
                                "image": image[8]
                            },
                            "item_neutral": {
                                "name": item[9],
                                "image": image[9]
                            },
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
                        "dire_barracks": dBarracks
                    }
                    res.statusCode = 200;
                    res.json(data);
                });
        }
        else
            res.send('You need to enter a valid match ID');
    })
    .all(methodNotAllowed);

module.exports = matchRouter;