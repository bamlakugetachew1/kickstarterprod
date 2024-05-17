require('dotenv').config();
const validateconfig = require('../validate/env.validate');
const logger = require('../logger/logger');

const { value: envValues, error } = validateconfig.validate(process.env);
if (error) {
  logger.error(error);
}

module.exports = {
  port: envValues.port,
  NODE_ENV: envValues.NODE_ENV,
  MONGO_URL: envValues.MONGO_URL,
  SecretToken: envValues.SecretToken,
  PaypalAccessToken: envValues.PaypalAccessToken,
  SessionKey: envValues.SessionKey,
  redisUrl: envValues.redisUrl,
  Cloudnry_Api: envValues.Cloudnry_Api,
  Cloudnry_Secret: envValues.Cloudnry_Secret,
  Cloudnry_Name: envValues.Cloudnry_Name,
};
