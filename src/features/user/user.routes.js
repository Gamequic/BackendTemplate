const express = require('express');

const validationHandler = require('../../../middlewares/validator.handler');
const { rootAuth } = require('./../../../middlewares/root.handler');
const { authenticationToSelf } = require('./../../../middlewares/auth.handler');
const {
    createUserSchema, updateUserSchema, getUserSchema, deleteUserSchema
} = require('./user.schema');
const UserService = require('./user.service');

const router = express.Router();
const service = new UserService();

router.post(
    '/create',
    validationHandler(createUserSchema, 'body'),
    async (req, res, next) => {
        try {
            res.status(201).json(await service.create(req.body));
        } catch (error) {
            next(error);
        }
    },
);

router.delete(
    '/delete/:id',
    rootAuth,
    authenticationToSelf,
    validationHandler(getUserSchema, 'params'),
    async (req, res, next) => {
        try {
            const userId = req.params.id;
            res.status(201).json(await service.delete(userId));
        } catch (error) {
            next(error);
        }
    },
);

router.get(
    '/:id',
    rootAuth,
    authenticationToSelf,
    validationHandler(getUserSchema, 'params'),
    async (req, res, next) => {
        try {
            const userId = req.params.id;
            res.json(await service.findOne(userId));
        } catch (error) {
            next(error);
        }
    },
);

router.patch(
    '/:id',
    rootAuth,
    authenticationToSelf,
    validationHandler(updateUserSchema, 'body'),
    validationHandler(getUserSchema, 'params'),
    async (req, res, next) => {
        try {
            const adminId = req.headers.id;
            const userId = req.params.id;
            const body = req.body;
            res.json(await service.update(userId, body));
        } catch (error) {
            next(error);
        }
    },
);

router.delete('/:id',
    rootAuth,
    validationHandler(getUserSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            res.status(200).json(await service.delete(id));
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
