const router = require('express').Router();
const verifyJwtToken = require('../helpers/verifyJwt');

const {
    register,
    login,
} = require('../controller/User/index');

router.post('/register', register);
router.post('/login', login);

module.exports = router;