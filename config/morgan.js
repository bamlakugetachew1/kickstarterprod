const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const { NODE_ENV } = require('./env.config');

morgan.token('message', (req, res) => res.locals.errMessage || '');

function getApiInfo() {
  return NODE_ENV === 'production' ? ':remote-addr' : '';
}
const succesFormat = `${getApiInfo()} :method :url :status :response-time ms :user-agent :date`;
const errorFormat = `${getApiInfo()} :method :url :status :response-time ms :user-agent :date  err-message :message`;
const accessLogStream = fs.createWriteStream(path.join(__dirname, '..', 'logs/access.log'), {
  flags: 'a',
});
const successHandler = morgan(succesFormat, {
  stream: accessLogStream,
  skip: (req, res) => res.statusCode >= 400,
});
const errorHandler = morgan(errorFormat, {
  stream: accessLogStream,
  skip: (req, res) => res.statusCode < 400,
});

module.exports = {
  successHandler,
  errorHandler,
};
