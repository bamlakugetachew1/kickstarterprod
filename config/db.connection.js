const mongoose = require('mongoose');
const { MONGO_URL } = require('./env.config');
const logger = require('../logger/logger');

mongoose.set('strictQuery', true);
const connectToMongo = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    logger.info('Connected to MongoDB successfully!');
  } catch (error) {
    logger.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectToMongo;
