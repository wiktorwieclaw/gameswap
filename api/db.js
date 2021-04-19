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
const post = require('./models/post.model.js');
const message = require('./models/message.model.js');

user.belongsToMany(game, {
    through: 'userBuyGame'
});

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

game.belongsToMany(user, {
    through: 'userBuyGame'
});

user.belongsToMany(game, {
    through: 'userSellGame'
});

game.belongsToMany(user, {
    through: 'userSellGame'
});