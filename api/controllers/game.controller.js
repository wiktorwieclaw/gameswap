const axios = require('axios');
const dbAccess = require('../db-access');

module.exports.findByTitle = (req, res) => {
    axios({
        url: "https://api.igdb.com/v4/games",
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Client-ID': dbAccess.twitchClientId,
            'Authorization': `Bearer ${access.access_token}`,
        },
        data: `fields name; search "${req.body}"; limit 50;`
    })
        .then(response => {
            res.send(response.data)
        })
        .catch(err => {
            console.error(err);
        });
}