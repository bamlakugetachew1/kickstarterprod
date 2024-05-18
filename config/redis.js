// const redis = require('redis');
const Redis = require('ioredis');
const { redisUrl } = require('./env.config');

const client = new Redis(redisUrl);

// const client = redis.createClient({
//   password: 'vALRVarAbJeWmkE7c50Ij7APaF0wDVPh',
//   socket: {
//     host: 'redis-12946.c99.us-east-1-4.ec2.redns.redis-cloud.com',
//     port: 12946,
//   },
// });

// const client = redis.createClient({ url: redisUrl });
module.exports = client;
