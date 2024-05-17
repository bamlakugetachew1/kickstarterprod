const redis = require('redis');
const { redisUrl } = require('./env.config');

const client = redis.createClient({ url: redisUrl });
// const client = redis.createClient({
//   socket: {
//     port: 6379,
//     host: 'redis',
//   },
// });

module.exports = client;
