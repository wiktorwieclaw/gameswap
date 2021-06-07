const Sequelize = require('sequelize');
const db = require('../db.js');

module.exports = db.define('message', {
    text: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false
    }
});