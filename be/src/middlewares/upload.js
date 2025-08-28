const multer = require('multer');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith('image/')) {
    return cb(new Error('Chỉ cho phép upload ảnh (jpg/png/webp/avif...)'), false);
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 8 * 1024 * 1024 } }); // max 8MB

module.exports = upload;
