const path = require('path');
const fs = require('fs');
const zlib = require('zlib');
const Project = require('../models/project.model');
const catchAsync = require('../utils/catchAsync');
const { imageProcessor, videoProcessor } = require('../background-tasks');
const getContentType = require('../utils/getContentType');

exports.createproject = catchAsync(async (req, res) => {
  const project = new Project(req.body);
  await project.save();
  res.status(201).json({
    message: 'project added succesfully',
  });
});

exports.uploadImage = catchAsync(async (req, res) => {
  if (!req.files) {
    res.status(400).json({ error: 'No file uploaded' });
  }
  const filenames = req.files.map((file) => file.filename);
  await imageProcessor.Queue.add('imageprocessor', {
    filenames,
  });
  await imageProcessor.Worker();
  res.status(200).json({ filenames });
});

exports.uploadVideo = catchAsync(async (req, res) => {
  if (!req.files) {
    res.status(400).json({ error: 'No file uploaded' });
  }
  const { filename } = req.files[0];
  await videoProcessor.Queue.add('videoprocessor', {
    filename,
  });
  await videoProcessor.Worker();
  res.status(200).json({ filename });
});

// eslint-disable-next-line consistent-return
exports.createImageReadStream = catchAsync(async (req, res) => {
  const { filename } = req.query;
  const fullPath = path.join(__dirname, '..', 'compressedimages', filename);

  if (!fs.existsSync(fullPath)) {
    return res.status(404).json({ error: 'File not found' });
  }

  const contentType = getContentType(filename);
  res.setHeader('Content-Type', contentType);

  const readStream = fs.createReadStream(fullPath);
  readStream.on('open', () => {
    readStream.pipe(res);
  });
  readStream.on('error', (err) => {
    res.status(500).send(err);
  });
});

// eslint-disable-next-line consistent-return
exports.createVideoReadStream = catchAsync(async (req, res) => {
  const { filename } = req.query;
  const videoPath = path.join(__dirname, '..', 'compressedvideo', `${filename}.gz`);

  if (!fs.existsSync(videoPath)) {
    return res.status(404).json({ error: 'File not found' });
  }

  const contentType = getContentType(filename);
  res.setHeader('Content-Type', contentType);

  const readStream = fs.createReadStream(videoPath);
  readStream.pipe(zlib.createGunzip()).pipe(res);

  readStream.on('error', (err) => {
    res.status(500).send(err);
  });
});
