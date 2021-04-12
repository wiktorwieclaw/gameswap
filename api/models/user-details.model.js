const Sequelize = require('sequelize');
const db = require('../db.js');

module.exports = db.define('userDetails', {
    name: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false
    },
    surname: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false
    }
});