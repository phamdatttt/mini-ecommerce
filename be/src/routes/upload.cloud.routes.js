const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authenticate');
const cloudController = require('../controllers/upload.cloud.controller');

// upload 1 ảnh
router.post('/:type/single', authenticate, cloudController.uploadSingle);

// upload nhiều ảnh
router.post('/:type/multiple', authenticate, cloudController.uploadMultiple);

// xóa ảnh theo publicId
router.delete('/:publicId', authenticate, cloudController.deleteFile);

module.exports = router;
