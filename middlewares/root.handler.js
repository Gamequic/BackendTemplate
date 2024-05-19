/*
    This middleware is use for block endpoints that are not desing for final use,
    To unblock the enpoint just remove this middleware.
*/

const Boom = require('@hapi/boom')

const { config } = require('./../config/config');

function rootAuth (req, res, next) {
    const userRoot = req.headers.userroot;
    const passwordRoot = req.headers.passwordroot;
    if ((userRoot === config.userRoot) && (passwordRoot === config.passwordRoot)) {
        next();
    } else {
        Boom.unauthorized('Root authentication failed.');
    }
}

module.exports = { rootAuth };