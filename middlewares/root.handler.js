import Boom from 'boom';

import { config } from './../config/config';

function rootAuth() {
    return (req, res, next) => {
        const userRoot = req.headers.userroot;
        const passwordRoot = req.headers.passwordroot;
        if ((userRoot === config.userRoot) && (passwordRoot === config.passwordRoot)) {
            next();
        } else {
            Boom.unauthorized('Root authentication failed.');
        }
    };
}


export default rootAuth;