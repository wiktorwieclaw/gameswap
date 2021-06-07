const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dbAccess = require('../db-access');
const joi = require('joi');

const minChars = {
    email: 6,
    password: 6,
    name: 6,
    surname: 6
};

function registerValidation(data) {
    const schema = joi.object({
        email: joi.string()
            .min(minChars.email)
            .email()
            .required(),
        password: joi.string()
            .min(minChars.password)
            .required(),
        name: joi.string()
            .min(minChars.name)
            .required(),
        surname: joi.string()
            .min(minChars.surname)
            .required()
    });

    return schema.validate(data);
}

function loginValidation(data) {
    const schema = joi.object({
        email: joi.string()
            .min(minChars.email)
            .required()
            .email(),
        password: joi.string()
            .min(minChars.password)
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

    const emailExists = await User.findOne({where: {email: req.body.email}});

    if (emailExists !== null) {
        return res.status(400).send('email already exists');
    }

    const newUser = {
        email: req.body.email,
        password: await hashPassword(req.body.password),
        name: req.body.name,
        surname: req.body.surname
    };

    User.create(newUser)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).send(err.message);
        });
}

async function login(req, res) {
    const {error} = loginValidation(req.body);

    if (error) {
        const message = error.details[0].message;
        return res.status(400).send(message);
    }

    const foundUser = await User.findOne({where: {email: req.body.email}});

    if (!foundUser) {
        return res.status(400).send("email doesn't exist");
    }

    const validPass = await bcrypt.compare(req.body.password, foundUser.password);
    if (!validPass) {
        return res.status(400).send('Invalid password');
    }

    const token = jwt.sign({id: foundUser.id}, dbAccess.tokenSecret);

    res.header('auth-token', token)
        .cookie('jwt', token, {
           httpOnly: false,
           secure: false,
           sameSite: false
        })
        .send(foundUser);
}

async function logout(req, res) {
    res.status(202)
        .clearCookie('jwt')
        .send('cookie cleared')
}

module.exports = {
    register,
    login,
    logout
}