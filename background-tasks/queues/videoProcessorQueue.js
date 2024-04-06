const { Queue } = require('bullmq');

const videoProcessorQueue = new Queue('videoprocessor', {
  connection: {
    host: 'localhost',
    port: '6379',
  },
});
module.exports = videoProcessorQueue;
