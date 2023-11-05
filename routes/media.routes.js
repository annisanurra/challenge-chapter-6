const express = require('express');
const router = express.Router();
const ImageController = require('../controllers/media.controller');

router.post('/upload', ImageController.uploadImage);
router.get('/', ImageController.getImages);
router.get('/:id', ImageController.getImage);
router.put('/:id', ImageController.updateImage);
router.delete('/:id', ImageController.deleteImage);

module.exports = router;