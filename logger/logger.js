const winston = require('winston');
const path = require('path');
const { format } = require('winston');

const { combine, timestamp, label, prettyPrint } = format;
const parentDir = path.dirname(__dirname);
const logsDirectory = path.join(parentDir, 'logs');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: path.join(logsDirectory, 'error.log'),
      level: 'error',
    }),
    new winston.transports.File({
      filename: path.join(logsDirectory, 'combined.log'),
    }),
  ],
});

if (process.env.NODE_ENV === 'development') {
  logger.add(
    new winston.transports.Console({
      format: combine(label({ label: 'development level' }), timestamp(), prettyPrint(), format.colorize()),
    }),
  );
}

module.exports = logger;
