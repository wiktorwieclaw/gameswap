const express = require('express');
const router = express.Router();
const db = require('../db.js');
const user = require('../models/user.model.js');

router.get('/', (req, res) => {
    user.findAll()
        .then(users => console.log(users))
        .catch(err => console.log(err));
});

module.exports = router;