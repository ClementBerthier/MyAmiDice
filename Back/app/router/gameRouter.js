const express = require('express');
const { gameController } = require('../controller');
const errorHandler = require('../../service/errorService/errorHandler');

const router = express.Router();

router.get('/getall', gameController.basicQuery.getAll);
router.get('/:id/:userid', gameController.getGameByIdWithAll); /*on attend 2 id*/
router.delete( '/:id', gameController.basicQuery.deleteById);
router.post('/create', gameController.basicQuery.createOrUpdate );

module.exports = router;