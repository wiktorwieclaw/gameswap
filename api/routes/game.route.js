const express = require('express');
const router = express.Router();
const db = require('../db.js');
const game = require('../models/game.model.js');

router.get('/', (req, res) => {
    game.findAll()
        .then(games => console.log(games))
        .catch(err => console.log(err));
});

module.exports = router;