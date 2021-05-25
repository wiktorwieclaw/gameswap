const user = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dbAccess = require('../db-access');
const joi = require('joi');

function registerValidation(data) {
    const schema = joi.object({
        email: joi.string()
            .min(6)
            .email()
            .required(),
        password: joi.string()
            .min(6)
            .required(),
        name: joi.string()
            .min(6)
            .required(),
        surname: joi.string()
            .min(6)
            .required()
    });

    return schema.validate(data);
}

function loginValidation(data) {
    const schema = joi.object({
        email: joi.string()
            .min(6)
            .required()
            .email(),
        password: joi.string()
            .min(6)
            .required()
    });

    return schema.validate(data);
}

async function hashPassword(passwd) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(passwd, salt);
}

async function register(req, res) {
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const emailExists = user.findOne({where: {email: req.body.email}});
    if (emailExists !== undefined) {
        return res.status(400).send('email already exists');
    }

    const newUser = {
        email: req.body.email,
        password: await hashPassword(req.body.password),
        name: req.body.name,
        surname: req.body.surname
    };

    user.create(newUser)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).send({
                messages: err.message
            });
        });
}

async function login(req, res) {
    const {error} = loginValidation(req.body);

    if (error) {
        const message = error.details[0].message;
        return res.status(400).send(message);
    }

    const foundUser = await user.findOne({where: {email: req.body.email}});

    if (!foundUser) {
        return res.status(400).send("email doesn't exist");
    }

    const validPass = await bcrypt.compare(req.body.password, foundUser.password);
    if (!validPass) {
        return res.status(400).send('Invalid password');
    }

    const token = jwt.sign({id: user.id}, dbAccess.tokenSecret);
    res.header('auth-token', token).send(token);
}

module.exports = {
    register,
    login
}