const Joi = require('joi');

const email = Joi.string().email();
const password = Joi.string().min(8);
const token = Joi.string().min(10)

const login = Joi.object({
    email: email.required(),
    password: password.required(),
});

const askPasswordReset = Joi.object({
    email: email.required(),
});

const applyPasswordReset = Joi.object({
    password: password.required(),
    token: token.required()
});

module.exports = { login, askPasswordReset, applyPasswordReset };
