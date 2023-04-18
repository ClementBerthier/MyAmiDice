const express = require('express');
const { inviteController } = require('../controller');

const router = express.Router();

// router.get('', inviteController.basicQuery.getAll);
router.get('/:id', inviteController.basicQuery.getById);
router.delete( '/:id', inviteController.basicQuery.deleteById);
router.post('/create', inviteController.basicQuery.createOrUpdate );

module.exports = router;