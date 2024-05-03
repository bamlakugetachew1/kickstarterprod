const httpStatus = require('http-status');
const { favouriteService } = require('../services');
const { catchAsync, handleServiceRequest } = require('../utils');

exports.addToFavourites = catchAsync(async (req, res) => {
  const { projectid, creatorid } = req.body;
  handleServiceRequest(res, favouriteService.addToFavourites, httpStatus.OK, projectid, creatorid);
});
