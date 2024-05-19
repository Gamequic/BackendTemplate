const express = require('express');

const validationHandler = require('../../../middlewares/validator.handler');
const { login, askPasswordReset, applyPasswordReset } = require('./auth.schema');
const { getUserSchema } = require('./../user/user.schema');
const { authentication, authenticationToSelf } = require('./../../../middlewares/auth.handler');
const AuthService = require('./auth.service');

const router = express.Router();
const service = new AuthService();

router.post(
    '/login',
    validationHandler(login, 'body'),
    async (req, res, next) => {
        try {
            res.status(201).json(await service.logIn(req.body));
        } catch (error) {
            next(error);
        }
    },
);

router.post("/askresetpassword",
  validationHandler(askPasswordReset, 'body'),
  async (req, res, next) => {
    try {
      const { email } = req.body;
      rta = await service.askPasswordReset(email)
      res.status(201).json({rta})
    } catch (error) {
      next(error);
    }
  }
);

router.post("/resetpassword",
  validationHandler(applyPasswordReset, 'body'),
  async (req, res, next) => {
    try {
      const { password, token } = req.body;
      user = await service.applyPasswordReset(token, password)
      res.status(201).json({user: user})
    } catch (error) {
      next(error);
    }
  }
);

router.post("/upload-profilephoto/:id",
  validationHandler(getUserSchema, 'params'),
  authentication,
  authenticationToSelf,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const profilePhoto = req.files.profilePhoto
      const user = await service.uploadPhoto(profilePhoto, id);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
