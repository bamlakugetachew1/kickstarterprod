const imageProcessorQueue = require('./queues/imageProcessorQueue');
const videoProcessorQueue = require('./queues/videoProcessorQueue');
const { startImageProcessor, startVideoProcessor } = require('./workers');

module.exports = {
  imageProcessor: {
    Queue: imageProcessorQueue,
    Worker: startImageProcessor,
  },
  videoProcessor: {
    Queue: videoProcessorQueue,
    Worker: startVideoProcessor,
  },
};
