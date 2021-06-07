const userBuyGame = require('../models/user-buy-game.model');
const game = require('../models/game.model');

async function create(req, res) {
    const result = await game.findOrCreate({
        where: {igdbId: req.body.gameId}
    });
    const newGame = result[0];

    await userBuyGame.create({
        userId: req.body.userId,
        gameId: newGame.dataValues.id
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            messages: err.message
        });
    });
}

module.exports = {
    create
}