const ffmpeg = require('fluent-ffmpeg');
const logger = require('../logger/logger');
const catchAsync = require('./catchAsync');

const compressVideo = catchAsync(async (filePath) => {
  ffmpeg(filePath)
    .videoCodec('libx264')
    .videoBitrate('1000k')
    .size('1280x720')
    .on('error', (err) => {
      logger.error('An error occurred:', err.message);
    })
    .on('end', () => {
      logger.info('Compression complete');
    })
    .save(filePath);
});

module.exports = compressVideo;
