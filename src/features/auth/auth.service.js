const boom = require('boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { models } = require('../../db/libs/sequelize');
const { config } = require('../../../config/config');
const { EmailService } = require('./../email/index');

const { PasswordRecovery } = require('../../../public/html/passwordRecovery.page');

class AuthService {
    constructor() {}

    async uploadPhoto(photo, id){
      // Ge user
      const user = await this.findOne(id);
      delete user.dataValues.password;

      // Check foto
      if (!photo) {
        throw boom.badRequest('No files were uploaded.')
      }

      // Move photo to public dir
      const path = __dirname + "./../../../public/profilePhotos/" + `profilePhoto${id}`;
      photo.mv(path, (err) => {
        if (err) {
          throw boom.internal(err)
        }
      });

      // Set photo to user
      return await this.update(id, {
        photo: `/public/profilePhotos/profilePhoto${id}`
      })
    }

    async askPasswordReset(email){
      // Does user exist?
      const user = await models.User.findOne({
        where: {
          email: email
        }
      });
      if (!user) {
        throw boom.notFound("User not found")
      }
      delete user.dataValues.password;

      // Generate Token
      const token = jwt.sign({
        id: user.dataValues.id,
        email: user.dataValues.email,
        name: user.dataValues.name
      }, config.authSecret, { expiresIn: 900 });

      // Send email
      const mail =  await EmailService.sendMail({
        from: '"Password reset" <demiancalleros1@gmail.com>',
        to: email,
        subject: "Password reset",
        text: ``,
        html: PasswordRecovery({ ipAddres:config.ipAddress, token })
      });

      return "Email sent"
    }

    async applyPasswordReset(token, password){
      return new Promise((resolve, reject) => {
        // Is token valid?
        jwt.verify(token, config.authSecret, async (err, decoded) => {
          if (err) {
            reject(boom.unauthorized("The token is not valid"));
          } else {
            // Update password
            const user = await this.update(decoded.id, {password: bcrypt.hashSync(password, parseInt(config.saltRounds))});
            delete user.dataValues.password;
            resolve(user);
          }
        });
      });
    }

    async logIn({ email, password }) {
        // Does user exists?
        var user;
        user = await models.User.findOne({
          where: {
            email: email,
          },
        });
        if (user) {
          user.dataValues = { ...user.dataValues };
        }
        if (!user) {
          throw boom.notFound('User not found');
        }

        // Check password
        const result = await bcrypt.compare(password, user.dataValues.password);
        if (!result) {
          // Incorrect password
          throw boom.unauthorized('Password is wrong');
        }

        //Create token
        const token = await jwt.sign(
            {
                id: user.dataValues.id,
                email: user.dataValues.email,
            },
            config.authSecret,
            { expiresIn: 1800 },
        ); //30 min

        delete user.dataValues.password;

        const userData = {
            ...user.dataValues,
            token,
        };

        return { userData, statusCode: 202 };
    }
}

module.exports = AuthService;
