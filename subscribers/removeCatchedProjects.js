const { eventEmitter } = require('../utils');
const client = require('../config/redis');

async function removeCatchedProjects(key) {
  await client.del(key);
}

// Subscribe to 'clearCatched' event
eventEmitter.on('clearCatched', (key) => {
  removeCatchedProjects(key);
});
