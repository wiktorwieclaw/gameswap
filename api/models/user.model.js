const Sequelize = require('sequelize');
const db = require('../db.js');

module.exports = db.define('user', {
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false
    }
});