const jwt = require('jsonwebtoken');

// code by: https://imasters.com.br/back-end/autenticacao-json-web-token-jwt-em-node-js
const verifyJWT = (req, res, next) => {
    const token = req.headers['token'];
    if (!token) {
        return res.status(401).send({ auth: false, message: 'No token provided.' });
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }
        next();
    });

};

module.exports = verifyJWT;