const dbAccess = require('./db-access.js');
const Sequelize = require('sequelize');

module.exports = new Sequelize(dbAccess.uri, {
    host: 'localhost',
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const user = require('./models/user.model.js');
const game = require('./models/game.model.js');
const message = require('./models/message.model.js');
const userBuyGame = require('./models/user-buy-game.model.js');

user.hasOne(message, {
    foreignKey: {
        name: 'userFromId',
        allowNull: false
    }
});

user.hasOne(message, {
    foreignKey: {
        name: 'userToId',
        allowNull: false
    }
});

user.belongsToMany(game, {
    through: userBuyGame
});

game.belongsToMany(user, {
    through: userBuyGame
});