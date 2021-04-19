const Sequelize = require('sequelize');
const db = require('../db.js');
const user = require('../models/user.model');

exports.create = (req, res) => {
    const newUser = {
        email: req.body.mail,
        password: req.body.password,
        name: "test",
        surname: "test"
    };

    user.create(newUser)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                messages: err.message
            });
        });
};