const { NODE_ENV } = require('../config/env.config');

const ErrorHandler = (err, req, res) => {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || 'Internal Server Error';
  res.locals.errMessage = errMsg;
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: NODE_ENV === 'development' ? err.stack : {},
  });
};
module.exports = ErrorHandler;
