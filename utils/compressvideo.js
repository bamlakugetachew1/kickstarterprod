const fs = require('fs');
const zlib = require('zlib');
const path = require('path');
const logger = require('../logger/logger');
const catchAsync = require('./catchAsync');

const compressVideo = catchAsync(async (filename) => {
  const inputPath = path.join(__dirname, '..', 'videos', filename);
  const outputPath = path.join(__dirname, '..', 'compressedvideo', `${filename}.gz`);

  await new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(inputPath);
    const writeStream = fs.createWriteStream(outputPath);

    const gzip = zlib.createGzip();

    readStream.pipe(gzip).pipe(writeStream);

    writeStream.on('finish', () => {
      logger.info('Compression finished');
      resolve();
    });

    writeStream.on('error', (err) => {
      logger.error('Error during compression:', err);
      reject(err);
    });
  });
});

module.exports = compressVideo;
