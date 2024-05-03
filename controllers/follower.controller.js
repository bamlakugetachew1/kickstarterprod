const httpStatus = require('http-status');
const { followerService } = require('../services');
const { catchAsync, handleServiceRequest } = require('../utils');

exports.followCreator = catchAsync(async (req, res) => {
  const { followerid, followedid } = req.body;
  handleServiceRequest(res, followerService.followCreator, httpStatus.OK, followerid, followedid);
});
