const Sequelize = require('sequelize');
const db = require('../db.js');

const Game = db.define('game', {
    title: {
        type: Sequelize.STRING
    },
    image: {
        type: Sequelize.STRING
    }
})

module.exports = Game;