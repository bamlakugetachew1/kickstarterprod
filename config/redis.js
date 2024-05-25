const redis = require('redis');
const { redisUrl } = require('./env.config');

const client = redis.createClient({
  url: redisUrl,
});
module.exports = client;
