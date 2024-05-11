/* eslint-disable */
const mongoose = require('mongoose');
const connectToMongo = require('./db.connection');
const logger = require('../logger/logger');
const client = require('./redis');
const { port } = require('./env.config');
const app = require('../app');

let server;

beforeAll(async () => {
  await connectToMongo();
  await client.connect();
  logger.info('MongoDB and Redis connections established');
  server = app.listen(port);
});

afterAll(async () => {
  if (server) {
    server.close();
  }
  await client.disconnect();
  await mongoose.disconnect();
  logger.info('Server, MongoDB, and Redis connections closed');
}, 10000);

module.exports = { server };
