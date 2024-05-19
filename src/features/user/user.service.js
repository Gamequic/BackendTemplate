const boom = require('boom');
const bcrypt = require('bcrypt');

const { models } = require('../../db/libs/sequelize');
const { config } = require('../../../config/config');

class UserService {
    constructor() {}

    async create(data) {
        try {
            const newUser = await models.User.create({
                ...data,
                password: await bcrypt.hashSync(
                    data.password,
                    parseInt(config.saltRounds),
                ),
            });
            delete newUser.dataValues.password;
            return newUser;   
        } catch (error) {
            if (error.errors[0].type === 'unique violation'){
                throw boom.conflict("Email is in use by other user.")
            }
            throw error
        }
    }

    async findAll() {
        const rta = await models.User.findAll();
        return rta;

    }

    async findOne(id) {
        const user = await models.User.findByPk(id);
        if (!user) {
            throw boom.notFound('User not found.');
        }
        delete user.dataValues.password;
        return user;
    }

    async delete(id) {
        const user = await this.findOne(id);
        await user.destroy();
        return { id };
      }

    async update(id, changes) {
        const user = await this.findOne(id);
        const result = await user.update(changes);
        return result;
      }
}

module.exports = UserService;
