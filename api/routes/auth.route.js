const router = require('express').Router();
const user = require('../models/user.model');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation} = require('../validation');
const jwt = require('jsonwebtoken');
const dbAccess = require('../db-access');

router.post('/register', async (req, res) => {
    const {error} = registerValidation(req.body);

    if (error) {
        const message = error.details[0].message;
        return res.status(400).send(message);
    }

    const emailExists = user.findOne({ where: {email: req.body.email}});
    if (!emailExists) {
        return res.status(400).send('email already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = {
        email: req.body.email,
        password: hashedPassword,
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
});

router.post('/login', async (req, res) => {
    const {error} = loginValidation(req.body);

    if (error) {
        const message = error.details[0].message;
        return res.status(400).send(message);
    }

    const foundUser = await user.findOne({ where: {email: req.body.email}});

    if (!foundUser) {
        return res.status(400).send("email doesn't exist");
    }

    const validPass = await bcrypt.compare(req.body.password, foundUser.password);
    if (!validPass) {
        return res.status(400).send('Invalid password');
    }

    const token = jwt.sign({id: user.id}, dbAccess.tokenSecret);
    res.header('auth-token', token).send(token);
});

module.exports = router;
