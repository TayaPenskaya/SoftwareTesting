const jwt = require('express-jwt');
const secret = require('../config/auth').secret;

function getTokenFromHeader(req){
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
}

const auth = {
    required: jwt({
        secret: secret,
        algorithms: ['HS256'],
        userProperty: 'payload',
        getToken: getTokenFromHeader
    })
};

module.exports = auth;