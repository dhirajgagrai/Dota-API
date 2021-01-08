const fetch = require('node-fetch');
const fs = require('fs');

require('dotenv').config();

fetch(`http://api.steampowered.com/IEconDOTA2_570/GetHeroes/v1?key=${process.env.API_KEY}&language=en`)
    .then((fetchResponse) => fetchResponse.json())
    .then((dotaHeroes) => {
        var data = {
            "heroes": dotaHeroes.result.heroes
        };

        fs.writeFile('./json/dotaHeroes.json', JSON.stringify(data, null, 4), 'utf8', () => console.log('Heroes list updated.'));
    });

fetch(`http://api.steampowered.com/IEconDOTA2_570/GetGameItems/v1?key=${process.env.API_KEY}&language=en`)
    .then((fetchResponse) => fetchResponse.json())
    .then((dotaItems) => {
        var data = {
            "items": dotaItems.result.items
        };

        fs.writeFile('./json/dotaItems.json', JSON.stringify(data, null, 4), 'utf8', () => console.log('Items list updated.'));
    });