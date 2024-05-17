/* eslint-disable camelcase */
const httpStatus = require('http-status');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { Cloudnry_Api, Cloudnry_Secret, Cloudnry_Name } = require('../config/env.config');
const ApiError = require('./ApiError');

const getFileType = (mimetype) => {
  if (mimetype.startsWith('image')) {
    return 'image';
  }
  if (mimetype.startsWith('video')) {
    return 'video';
  }
  return 'other';
};

cloudinary.config({
  cloud_name: Cloudnry_Name,
  api_key: Cloudnry_Api,
  api_secret: Cloudnry_Secret,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'kickstarter',
    resource_type: (req, file) => getFileType(file.mimetype),
    public_id: (req, file) => `${file.fieldname}_${Date.now()}`,
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
const upload = multer({ storage, fileFilter });
const uploadMiddleware = (fieldName) => (req, res, next) => {
  // eslint-disable-next-line consistent-return
  upload.array(fieldName)(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      throw new ApiError(httpStatus.BAD_REQUEST, err.message);
    }
    if (err) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
    }
    next();
  });
};

module.exports = uploadMiddleware;
