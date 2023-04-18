const express = require('express');
const { itemController } = require('../controller');

const router = express.Router();

// router.get('', itemController.basicQuery.getAll);
router.get('/:id', itemController.basicQuery.getById);
router.delete( '/:id', itemController.basicQuery.deleteById);
router.post('/create', itemController.basicQuery.createOrUpdate );

module.exports = router;