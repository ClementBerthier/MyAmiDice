const express = require('express');
const { skillController } = require('../controller');

const router = express.Router();

// router.get('/getall', skillController.basicQuery.getAll);
router.get('/:id', skillController.basicQuery.getById);
router.delete('/:id', skillController.basicQuery.deleteById);
router.post('/create', skillController.basicQuery.createOrUpdate );

module.exports = router;