const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { AppError } = require('../middlewares/errorHandler');

require('../config/cloudinary');

// map folder theo type (giữ nguyên phần này của bạn nếu đã có)
const folderMap = {
  products: 'ecommerce/products',
  reviews:  'ecommerce/reviews',
  users:    'ecommerce/users',
};

// tỷ lệ mặc định theo loại
const ratioMap = {
  products: '4:3',
  reviews:  '4:3',
  users:    '1:1',
};

const parseRatio = (r) => (r === '1:1' || r === '4:3') ? r : null;

// Tạo storage có ép ratio & size
const makeStorage = (folder, ratio = '4:3') =>
  new CloudinaryStorage({
    cloudinary,
    params: {
      folder,
      resource_type: 'image',
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
      // Chuẩn hóa: 1:1 => 800x800, 4:3 => 800x600 (>= 400)
      transformation: [
        ratio === '1:1'
          ? { width: 800, height: 800, crop: 'fill', gravity: 'auto' }
          : { width: 800, height: 600, crop: 'fill', gravity: 'auto' },
        { quality: 'auto', fetch_format: 'auto' },
      ],
    },
  });

// tạo uploader (ép theo type, cho phép override ?ratio=1:1|4:3)
const makeUploader = (type, ratioFromQuery) => {
  const folder = folderMap[type] || folderMap.products;
  const ratio  = parseRatio(ratioFromQuery) || ratioMap[type] || '4:3';
  const storage = makeStorage(folder, ratio);
  return multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024, files: 10 },
    fileFilter: (_req, file, cb) => {
      const ok = ['image/jpeg','image/jpg','image/png','image/webp','image/gif'].includes(file.mimetype);
      cb(ok ? null : new AppError('Chỉ chấp nhận ảnh (JPG/PNG/WebP/GIF)', 400));
    },
  });
};

// Kiểm kích thước gốc tối thiểu (reject nếu < 400x400)
const ensureMinSize = async (file) => {
  // multer-storage-cloudinary thường KHÔNG có width/height gốc → hỏi Cloudinary
  const meta = await cloudinary.api.resource(file.filename);
  if (meta.width < 400 || meta.height < 400) {
    await cloudinary.uploader.destroy(file.filename); // dọn rác
    throw new AppError('Ảnh quá nhỏ, cần tối thiểu 400x400px', 400);
  }
};

// ========== HANDLERS ==========
const uploadSingle = (req, res, next) => {
  const type  = req.params.type || 'products';
  const ratio = req.query.ratio;
  const uploader = makeUploader(type, ratio).single('file');

  uploader(req, res, async (err) => {
    try {
      if (err) return next(err);
      if (!req.file) throw new AppError('Không có file được upload', 400);

      await ensureMinSize(req.file);

      const { path: url, filename: public_id, originalname, size } = req.file;
      return res.status(200).json({
        status: 'success',
        message: 'Upload Cloudinary thành công',
        data: { url, public_id, originalName: originalname, size, type },
      });
    } catch (e) { next(e); }
  });
};

const uploadMultiple = (req, res, next) => {
  const type  = req.params.type || 'products';
  const ratio = req.query.ratio;
  const maxFiles = type === 'reviews' ? 5 : 10;
  const uploader = makeUploader(type, ratio).array('files', maxFiles);

  uploader(req, res, async (err) => {
    try {
      if (err) return next(err);
      if (!req.files || req.files.length === 0) throw new AppError('Không có file được upload', 400);

      // validate từng ảnh
      for (const f of req.files) await ensureMinSize(f);

      const files = req.files.map(f => ({
        url: f.path,
        public_id: f.filename,
        originalName: f.originalname,
        size: f.size,
      }));

      return res.status(200).json({
        status: 'success',
        message: `Upload ${files.length} ảnh Cloudinary thành công`,
        data: { files, type, count: files.length },
      });
    } catch (e) { next(e); }
  });
};

const deleteFile = async (req, res, next) => {
  try {
    const { publicId } = req.params;
    if (!publicId) throw new AppError('Thiếu publicId', 400);
    const result = await cloudinary.uploader.destroy(publicId);
    if (result.result !== 'ok' && result.result !== 'not found') {
      throw new AppError('Xóa ảnh thất bại', 400);
    }
    res.status(200).json({ status: 'success', message: 'Đã xóa ảnh' });
  } catch (err) { next(err); }
};

module.exports = { uploadSingle, uploadMultiple, deleteFile };
