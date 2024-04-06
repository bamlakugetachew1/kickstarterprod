const multer = require('multer');
const path = require('path');

const getFileType = (mimetype) => {
  if (mimetype.startsWith('image')) {
    return 'images';
  }
  if (mimetype.startsWith('video')) {
    return 'videos';
  }
  return 'other';
};

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const fileType = getFileType(file.mimetype);
    const uploadPath = path.join(__dirname, '..', fileType);
    cb(null, uploadPath);
  },
  filename(req, file, cb) {
    const extension = path.extname(file.originalname);
    cb(null, `${file.fieldname}_${Date.now()}${extension}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'video/mp4', 'video/quicktime', 'video/webm'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only PNG, JPG, JPEG, MP4, MOV, and WEBM files are allowed'), false);
  }
};

module.exports = multer({
  storage,
  fileFilter,
});
