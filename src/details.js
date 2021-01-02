const heroData = require('../json/dotaHeroes.json');
const itemData = require('../json/dotaItems.json');

const gameMode = function (modeNo) {
    var mode = ["None", "All Pick", "Captain's Mode", "Random Draft", "Single Draft",
        "All Random", "Intro", "Diretide", "Reverse Captain's Mode", "The Greeviling",
        "Tutorial", "Mid Only", "Least Played", "New Player Pool", "Compendium Matchmaking",
        "Co-op vs Bots", "Captains Draft", " ", "Ability Draft", " ", "All Random Deathmatch",
        "1v1 Mid Only", "All Pick", "Turbo Mode"];

    return (mode[modeNo]);
}

const lobbyType = function (lobbyNo) {
    var lobby = ["Normal", "Practice", "Tournament", "Tutorial", "Co-op with Bots", "Party",
        "Solo Queue", "Ranked", "1v1 Mid"];

    if (lobbyNo == -1)
        return "Invalid";
    else
        return (lobby[lobbyNo]);
}

const faction = function (slot) {
    bin = ("00000000" + slot.toString(2)).slice(-8);
    factionValue = bin.slice(0, 1);
    if (factionValue == 0)
        return "Radiant";
    else
        return "Dire";
}

const slot = function (slot) {
    bin = ("000" + slot.toString(2)).slice(-3);
    slotValue = parseInt(bin, 2);
    return(slotValue);
}

const won = function (radiantWin) {
    if (radiantWin)
        return "Radiant";
    else
        return "Dire";
}

const result = function (faction, won) {
    if (faction == won)
        return "Won";
    else
        return "Lost";
}

const abandon = function (left) {
    if (left)
        return 1;
    else
        return 0;
}

const heroName = function (id) {
    for (hero of heroData.heroes)
        if (hero.id == id)
            return hero.localized_name;
}

const heroImage = function (id, size) {
    for (hero of heroData.heroes)
        if (hero.id == id) {
            var name = hero.name.replace('npc_dota_hero_', '');
            switch (size) {
                case 'tiny':
                    return (`http://cdn.dota2.com/apps/dota2/images/heroes/${name}_eb.png`);
                    break;
                case 'small':
                    return (`http://cdn.dota2.com/apps/dota2/images/heroes/${name}_sb.png`);
                    break;
                case 'large':
                    return (`http://cdn.dota2.com/apps/dota2/images/heroes/${name}_lg.png`);
                    break;
                case 'full':
                    return (`http://cdn.dota2.com/apps/dota2/images/heroes/${name}_full.png`);
                    break;
                case 'vert':
                    return (`http://cdn.dota2.com/apps/dota2/images/heroes/${name}_vert.jpg`);
                    break;
            }
        }
}

const itemName = function (id) {
    if (id == 0)
        return (0);
    for (item of itemData.items)
        if (item.id == id)
            return item.localized_name;
}

const itemImage = function (id) {
    if (id == 0)
        return (0);
    for (item of itemData.items)
        if (item.id == id) {
            var name = item.name.replace('item_', '');
            return (`http://cdn.dota2.com/apps/dota2/images/items/${name}_lg.png`);
        }
}

const duration = function (time) {
    var minutes = Math.floor(time / 60);
    var seconds = time % 60;
    return (minutes + ":" + ("00" + seconds).slice(-2));
}

const tower = function (status) {
    bin = ("00000000000" + status.toString(2)).slice(-11);
    return {
        "Ancient Bottom": bin.slice(0, 1),
        "Ancient Top": bin.slice(1, 2),
        "Bottom Tier 3": bin.slice(2, 3),
        "Bottom Tier 2": bin.slice(3, 4),
        "Bottom Tier 1": bin.slice(4, 5),
        "Middle Tier 3": bin.slice(5, 6),
        "Middle Tier 2": bin.slice(6, 7),
        "Middle Tier 1": bin.slice(7, 8),
        "Top Tier 3": bin.slice(8, 9),
        "Top Tier 2": bin.slice(9, 10),
        "Top Tier 1": bin.slice(10, 11)
    }
}

const barracks = function (status) {
    bin = ("000000" + status.toString(2)).slice(-6);
    return {
        "Bottom Ranged": bin.slice(0, 1),
        "Bottom Melee": bin.slice(1, 2),
        "Middle Ranged": bin.slice(2, 3),
        "Middle Melee": bin.slice(3, 4),
        "Top Ranged": bin.slice(4, 5),
        "Top Melee": bin.slice(5, 6)
    }
}

module.exports = {
    gameMode,
    lobbyType,
    faction,
    slot,
    won,
    result,
    abandon,
    heroName,
    heroImage,
    itemName,
    itemImage,
    duration,
    tower,
    barracks
};