const axios = require('axios');
const httpStatus = require('http-status');
const ApiError = require('./ApiError');

const streamFile = async (res, fileUrl) => {
  if (!fileUrl) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'File URL is required');
  }
  try {
    const response = await axios({
      url: fileUrl,
      method: 'GET',
      responseType: 'stream',
    });

    const contentType = response.headers['content-type'];
    res.setHeader('Content-Type', contentType);

    response.data.pipe(res);

    response.data.on('error', (err) => {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new ApiError(httpStatus.NOT_FOUND, 'File not found');
    } else {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  }
};

module.exports = streamFile;
