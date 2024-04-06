const { Queue } = require('bullmq');

const imageProcessorQueue = new Queue('imageprocessor', {
  connection: {
    host: 'localhost',
    port: '6379',
  },
});
module.exports = imageProcessorQueue;
