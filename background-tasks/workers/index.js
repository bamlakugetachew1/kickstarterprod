const { Worker } = require('bullmq');
const compressimage = require('../../utils/compressImage');
const compressvideo = require('../../utils/compressvideo');

const startImageProcessor = async () => {
  const imageProcessorWorker = new Worker(
    'imageprocessor',
    async (job) => {
      const { filenames } = job.data;
      await compressimage(filenames);
    },
    {
      // Move the opening curly brace here
      connection: {
        host: 'localhost',
        port: '6379',
      },
      autorun: true,
      removeOnComplete: true,
      concurrency: 3,
    },
  );
  imageProcessorWorker.on('completed', (job) => `completed ${job.id}`);
};

const startVideoProcessor = async () => {
  const videoProcessorWorker = new Worker(
    'videoprocessor',
    async (job) => {
      const { filename } = job.data;
      await compressvideo(filename);
    },
    {
      // Move the opening curly brace here
      connection: {
        host: 'localhost',
        port: '6379',
      },
      autorun: true,
      removeOnComplete: true,
      concurrency: 3,
    },
  );
  videoProcessorWorker.on('completed', (job) => `completed ${job.id}`);
};

module.exports = { startImageProcessor, startVideoProcessor };
