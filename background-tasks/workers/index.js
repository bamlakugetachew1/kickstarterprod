const { Worker } = require('bullmq');
const { compressimage, compressvideo } = require('../../utils');
const { redisUrl } = require('../../config/env.config');

const startImageProcessor = async () => {
  const imageProcessorWorker = new Worker(
    'imageprocessor',
    async (job) => {
      const { filenames } = job.data;
      await compressimage(filenames);
    },
    {
      connection: redisUrl,
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
      connection: redisUrl,
      autorun: true,
      removeOnComplete: true,
      concurrency: 3,
    },
  );
  videoProcessorWorker.on('completed', (job) => `completed ${job.id}`);
};

module.exports = { startImageProcessor, startVideoProcessor };
