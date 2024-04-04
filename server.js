const app = require('./app');
const logger = require('./logger/logger');
const { port } = require('./config/env.config');

app.listen(port, (err) => {
  if (err) {
    logger.error(err);
  } else {
    logger.info(`Listening on port ${port}`);
  }
});
