const { Sequelize } = require('sequelize');

const { config } = require('../../../config/config.js');
const setupModels = require('../models/index.js');

const options = {
    dialect: 'postgres',
    logging: config.debugging,
};

if (config.isProd) {
    options.dialectOptions = {
        ssl: {
            rejectUnauthorized: false,
        },
    };
}

const sequelize = new Sequelize(config.dbUrl, options);

setupModels(sequelize);

sequelize.sync();

module.exports = sequelize;
