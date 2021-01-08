# DotaAPI

This an API for Dota 2, built over Steam Web API. This is a personal project and is not intended to replace the Steam Web API. This API returns more readable data and can be easily implemented on websites that provide in-game stats. API only returns JSON data currently.

## API Key

Get a dev key from [here](http://steamcommunity.com/dev/apikey).\
This is used for making calls to Steam Web API.

## Getting Started

Create a file named '.env' and add

```
API_KEY=*your-api-key*
```

Install dependencies

```sh
npm install
```

Start server

```sh
npm start
```

Now go to [http://localhost:9000/user/851481689/1](http://localhost:9000/user/851481689/1), it should return something like this

```json
[
  {
    "matchid": "___",
    "mode": "___",
    "...": "___",
    "duration": "___"
  }
]
```

### GET Match History

```
GET    /user/USER_ID
GET    /user/USER_ID/NO_OF_MATCHES
```

Returns a list of matches.\
If NO_OF_MATCHES is not provided, it will return last 10 matches by default.

### GET Match Details

```
GET    /match/MATCH_ID
```

Returns data containing **list of players and their stats**, **match info**, **towers and barracks status** and **picks and bans**.

## Update Heroes and Items

If new heroes or items are added to game, run this to update the lists.

```sh
npm run update
```

## Misc

For **abandon**, "0" means player didn't abandon.\
For **towers** and **barracks**, "0" means it's destroyed.\
For **items** and **backpack items**, "0" means that slot is empty.