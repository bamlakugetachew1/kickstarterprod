const httpStatus = require('http-status');

const handleServiceRequest = async (res, serviceFunction, statusCode = httpStatus.OK, ...args) => {
  let message = '';
  if (typeof args[args.length] === 'string') {
    message = args.pop();
  }

  const response = await serviceFunction(...args);
  const responseObject = { response };
  if (message) {
    responseObject.message = message;
  }
  return res.status(statusCode).json(responseObject);
};

module.exports = handleServiceRequest;
