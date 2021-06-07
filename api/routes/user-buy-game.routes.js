const router = require('express').Router();
const userBuyGameRoutes = require('../controllers/user-buy-game.controller');

router.post('/create', userBuyGameRoutes.create);

module.exports = router;