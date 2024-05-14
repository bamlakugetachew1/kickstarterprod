const httpStatus = require('http-status');

const handleServiceRequest = async (res, serviceFunction, statusCode = httpStatus.OK, ...args) => {
  try {
    const response = await serviceFunction(...args);
    if (statusCode === 307) {
      return res.redirect(response);
    }
    const responseObject = { response };
    return res.status(statusCode).json(responseObject);
  } catch (error) {
    return res.status(error.statusCode).json({ error: error.message });
  }
};

module.exports = handleServiceRequest;
