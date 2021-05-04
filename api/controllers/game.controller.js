const dbAccess = require('../db-access');
const igdb = require('igdb-api-node').default;
const game = require('../models/game.model.js');
const user = require('../models/user.model.js');

const client = igdb(dbAccess.twitchClientId, dbAccess.accessToken);

module.exports.findByTitle = async (req, res) => {
    const response = await client
        .fields(['name'])
        .limit(50)
        .search(req.params.title)
        .request('/games');

    res.send(response.data);
}

module.exports.findById = async (req, res) => {
    const response = await client
        .fields(['name'])
        .where(`id = ${req.params.id}`)
        .request('/games');

    res.send(response.data);
}

module.exports.findGamesByUserPk = (req, res) => {
    user.findOne({
        include: [{
            model: game,
            attributes: ['igdbId'],
            through: {
                attributes: []
            }
        }],
        where: {
            id: req.params.id
        },
        attributes: []
    }).then(async data => {
        if(!data.games.length) {
            res.send([]);
            return;
        }

        const conditions = data.games.reduce((accumulator, current) => accumulator + `id = ${current.igdbId} | `, '')
            .slice(0, -2);

        const response = await client
            .fields(['name'])
            .where(conditions)
            .request('/games');

        res.send(response.data);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
}