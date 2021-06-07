const user = require('../models/user.model');

async function findByPk(req, res) {
    user.findByPk(req.params.id)
        .then(data => {
            console.log(data.dataValues);
            res.send(data.dataValues);
        }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
}

async function findByEmail(req, res) {
    const email = req.params.email;
    console.log(email);

    user.findOne({
        where: {
            email: email
        }
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
}

module.exports = {
    findByPk,
    findByEmail
}