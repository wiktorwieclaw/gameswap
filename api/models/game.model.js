const Sequelize = require('sequelize');
const db = require('../db.js');

module.exports = db.define('game', {
    igdbId: {
        type: Sequelize.INTEGER
    }
});