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