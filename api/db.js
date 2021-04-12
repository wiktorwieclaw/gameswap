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
const userDetails = require('./models/user-details.model.js');
const game = require('./models/game.model.js');
const post = require('./models/post.model.js');

userDetails.hasOne(user, {
    foreignKey: {
        name: 'userDetailsId',
        allowNull: false
    }
});



