const router = require('express').Router();
const {
    getByName,
    getAll,
    create,
    update,
    deleteTask
} = require('../controller/Task/index');

router.get('/all', getAll);
router.get('/:title', getByName);
router.post('/create', create);
router.put('/update/:title', update);
router.delete('/delete/:id', deleteTask);

module.exports = router;