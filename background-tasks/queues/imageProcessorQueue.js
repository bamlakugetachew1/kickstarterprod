const { Queue } = require('bullmq');
const { redisUrl } = require('../../config/env.config');

const imageProcessorQueue = new Queue('imageprocessor', {
  connection: redisUrl,
});
module.exports = imageProcessorQueue;
