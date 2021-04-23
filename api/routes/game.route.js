const express = require('express');
const router = express.Router();
const db = require('../db.js');
const gameController = require('../controllers/game.controller.js');

router.get('/title/:title', gameController.findByTitle);

module.exports = router;