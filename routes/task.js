const router = require('express').Router();
const verifyJwtToken = require('../helpers/verifyJwt');
const {
    byUser,
    getAll,
    create,
    update,
    deleteTask
} = require('../controller/Task/index');

router.get('/all', verifyJwtToken, getAll);
router.get('/user/:id', verifyJwtToken, byUser);
router.post('/create', verifyJwtToken, create);
router.put('/update/:title', verifyJwtToken, update);
router.post('/delete/:id', verifyJwtToken, deleteTask);

module.exports = router;