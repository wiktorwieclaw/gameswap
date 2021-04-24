const dbAccess = require('../db-access');
const igdb = require('igdb-api-node').default;

const client = igdb(dbAccess.twitchClientId, dbAccess.accessToken);

module.exports.findByTitle = async (req, res) => {
    const response = await client
        .fields(['name'])
        .limit(50)
        .search(req.params.title)
        .request('/games');

    res.send(response.data);
}
