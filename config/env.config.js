require('dotenv').config();
const validateconfig = require('../validate/env.validate');
const logger = require('../logger/logger');

const { value: envVlues, error } = validateconfig.validate(process.env);
if (error) {
  logger.error(error);
}

module.exports = {
  port: envVlues.port,
  NODE_ENV: envVlues.NODE_ENV,
  MONGO_URL: envVlues.MONGO_URL,
  SecretToken: envVlues.SecretToken,
};
