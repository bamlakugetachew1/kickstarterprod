/* eslint-disable function-paren-newline */
const httpStatus = require('http-status');
const { creatorService } = require('../services');
const { catchAsync, handleServiceRequest } = require('../utils');

exports.createCreators = catchAsync(async (req, res) =>
  handleServiceRequest(res, creatorService.createCreators, httpStatus.CREATED, req.body),
);

exports.loginCreator = catchAsync(async (req, res) =>
  handleServiceRequest(res, creatorService.loginCreator, httpStatus.OK, req.body),
);

exports.individualCreatorsDetails = catchAsync(async (req, res) =>
  // eslint-disable-next-line max-len
  handleServiceRequest(res, creatorService.individualCreatorsDetails, httpStatus.OK, req.query.creatorid),
);

exports.getFavourites = catchAsync(async (req, res) =>
  handleServiceRequest(res, creatorService.getFavourites, httpStatus.OK, req.query.creatorid),
);

exports.getBackedProjects = catchAsync(async (req, res) =>
  handleServiceRequest(res, creatorService.getBackedProjects, httpStatus.OK, req.query.creatorid),
);

exports.getMyListedProjects = catchAsync(async (req, res) =>
  handleServiceRequest(res, creatorService.getMyListedProjects, httpStatus.OK, req.query.creatorid),
);

exports.updateAccountDetails = catchAsync(async (req, res) =>
  handleServiceRequest(
    res,
    creatorService.updateAccountDetails,
    httpStatus.OK,
    // eslint-disable-next-line no-underscore-dangle
    req.user.user._id,
    req.body,
  ),
);

exports.toggleVisibility = catchAsync(async (req, res) =>
  // eslint-disable-next-line no-underscore-dangle
  handleServiceRequest(res, creatorService.toggleVisibility, httpStatus.OK, req.user.user._id),
);
