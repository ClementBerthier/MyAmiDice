const express = require('express');
const { userController } = require('../controller');

const router = express.Router();

router.get('/getall', userController.basicQuery.getAll);
router.get('/:id', userController.basicQuery.getById);
router.delete( '/:id', userController.basicQuery.deleteById);
router.post('/create', userController.createUser );
router.post('/update', userController.updateUser);
router.post('/login',userController.logUser );

module.exports = router;