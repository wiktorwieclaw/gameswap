const router = require('express').Router();
const gameController = require('../controllers/game.controller.js');

router.get('/title/:title', gameController.findByTitle);
router.get('/id/:id', gameController.findById);
router.get('/byUserId/:id', gameController.findGamesByUserPk);
router.get('/byUserIdWithBoxArt/:id', gameController.findByIdWithBoxArt);

module.exports = router;