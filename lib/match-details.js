const heroData = require('../json/dotaHeroes.json');

const gameMode = function(modeNo) {
    var mode = ["None", "All Pick", "Captain's Mode", "Random Draft", "Single Draft", 
                "All Random", "Intro", "Diretide", "Reverse Captain's Mode", "The Greeviling", 
                "Tutorial", "Mid Only", "Least Played", "New Player Pool", "Compendium Matchmaking", 
                "Co-op vs Bots", "Captains Draft", " ", "Ability Draft", " ", "All Random Deathmatch", 
                "1v1 Mid Only", "All Pick", "Turbo Mode"];

    return(mode[modeNo]);
}

const lobbyType = function(lobbyNo) {
    var lobby = ["Normal", "Practice", "Tournament", "Tutorial", "Co-op with Bots", "Party", 
                "Solo Queue", "Ranked", "1v1 Mid"];

    if (lobbyNo == -1)
        return "Invalid";
    else
        return(lobby[lobbyNo]);
}

const faction = function(slot) {
    bin = ("00000000"+slot.toString(2)).slice(-8);
    factionValue = bin.slice(0, 1);
    if (factionValue == 0)
        return "Radiant";
    else
        return "Dire";
}

const won = function(radiantWin) {
    if (radiantWin)
        return "Radiant";
    else
        return "Dire";
}

const result = function(faction, won) {
    if (faction == won)
        return "Won";
    else
        return "Lost";
}

const abandon = function(left) {
    if (left)
        return "Yes";
    else
        return "No";
}

const heroDetail = function(id) {
    for (hero of heroData.result.heroes) {
        if (hero.id == id)
            return hero.localized_name;
    }
}

const duration = function(time) {
    var minutes = Math.floor(time / 60);
    var seconds = time % 60;
    return (minutes + ":" + ("00"+seconds).slice(-2));
}

module.exports = {
    gameMode,
    lobbyType,
    faction,
    won,
    result,
    abandon,
    heroDetail,
    duration
};