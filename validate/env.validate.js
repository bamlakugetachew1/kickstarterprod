const joi = require('joi');

const validateconfig = joi
  .object({
    port: joi.number().required(),
    NODE_ENV: joi.string().required(),
    MONGO_URL: joi.string().required(),
    SecretToken: joi.string().required(),
    PaypalAccessToken: joi.string().required(),
    SessionKey: joi.string().required(),
  })
  .unknown();
module.exports = validateconfig;
