const Sequelize = require('sequelize');
const db = require('../db.js');

module.exports = db.define('game', {
    title: {
        type: Sequelize.STRING
    },
    image: {
        type: Sequelize.STRING
    }
});