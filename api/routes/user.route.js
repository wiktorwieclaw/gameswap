const router = require('express').Router();
const userController = require('../controllers/user.controller.js');

router.get('/', (req, res) => {

});

router.get('/email/:email', userController.findByEmail);
router.get('/id/:id', userController.findByPk);

module.exports = router;