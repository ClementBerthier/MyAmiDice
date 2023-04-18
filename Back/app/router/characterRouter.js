// Dans le fichier characterRouter.js
const express = require('express');
const { characterController } = require('../controller');
const fileUpload = require('../../service/fileUploadMiddleware')('/public/characters/');


const router = express.Router();

// router.get('/getall', characterController.basicQuery.getAll);
router.get('/:id', characterController.getCharacterByIdWithAll);
router.delete( '/:id', characterController.basicQuery.deleteById);
router.post('/create', fileUpload.array('avatar'), characterController.createCharacterWithCaracteristics );
router.post('/update', fileUpload.single('avatar'), characterController.updateCharacter);

module.exports = router;