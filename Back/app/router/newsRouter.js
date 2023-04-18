const express = require('express');
const { newsController } = require('../controller');

const router = express.Router();

router.get('/getall', newsController.basicQuery.getAll);
router.get('/:id', newsController.basicQuery.getById);
router.delete( '/:id', newsController.basicQuery.deleteById);
router.post('/create', newsController.basicQuery.createOrUpdate );

module.exports = router;