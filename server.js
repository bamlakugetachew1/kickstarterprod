const app = require('./app');
const { port } = require('./config/env.config');
const connectToMongo = require('./config/db.connection');
const logger = require('./logger/logger');

(async () => {
  let server = null;
  try {
    await connectToMongo();
    server = app.listen(port, (err) => {
      if (err) {
        logger.error(err);
      } else {
        logger.info(`Listening on port ${port}`);
      }
    });

    const exitHandler = () => {
      if (server) {
        server.close(() => {
          logger.error('Server closed');
          process.exit(1); // Exit the process after handling the uncaught exception
        });
      } else {
        process.exit(1);
      }
    };

    const unExpectedErrorHandler = (error) => {
      logger.error(error);
      exitHandler();
    };

    process.on('unhandledRejection', unExpectedErrorHandler);
    process.on('uncaughtException', unExpectedErrorHandler);
  } catch (error) {
    logger.error(error);
  }
})();
