const express = require('express');
const router = express.Router();
const gameController = require('../controllers/game.controller.js');

router.get('/title/:title', gameController.findByTitle);
router.get('/id/:id', gameController.findById);
router.get('/byUserId/:id', gameController.findGamesByUserPk);

module.exports = router;