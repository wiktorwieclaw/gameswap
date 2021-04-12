const express = require('express');
const router = express.Router();
const db = require('../db.js');
const Game = require('../models/Game');

router.get('/', (req, res) => {
    Game.findAll()
        .then(games => console.log(games))
        .catch(err => console.log(err));
});

module.exports = router;