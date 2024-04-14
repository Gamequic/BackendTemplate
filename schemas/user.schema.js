const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const password = Joi.string().min(8);
const email = Joi.string().email();

const createUserSchema = Joi.object({
    name: name.required(),
    email: email.required(),
    password: password.required(),
});

const getUserSchema = Joi.object({
    id: id.required(),
});

const updateUserSchema = Joi.object({
    permissions: name,
    email: email
});

const deleteUserSchema = Joi.object({
    id: id.required()
})

module.exports = { createUserSchema, updateUserSchema, getUserSchema, deleteUserSchema };
