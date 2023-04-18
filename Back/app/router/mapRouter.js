// Dans le fichier mapRouter.js
const express = require('express');
const { mapController } = require('../controller');
const fileUpload = require('../../service/fileUploadMiddleware')('/public/maps/');


const router = express.Router();

// router.get('', mapController.basicQuery.getAll);
router.get('/:id', mapController.basicQuery.getById);
router.delete( '/:id', mapController.basicQuery.deleteById);
router.post('/:id', fileUpload.single('map'), mapController.mapCreate );

module.exports = router;