const user = require('../models/user.model');

module.exports.create = (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        surname: req.body.surname
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

module.exports.findByEmail = (req, res) => {
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