const { Queue } = require('bullmq');
const { redisUrl } = require('../../config/env.config');

const videoProcessorQueue = new Queue('videoprocessor', {
  connection: redisUrl,
});
module.exports = videoProcessorQueue;
