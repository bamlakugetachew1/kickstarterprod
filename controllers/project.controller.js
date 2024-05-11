/* eslint-disable function-paren-newline */
const httpStatus = require('http-status');
const { projectService } = require('../services');
const { handleServiceRequest, catchAsync } = require('../utils');

exports.createProject = catchAsync(async (req, res) =>
  handleServiceRequest(res, projectService.createProject, httpStatus.CREATED, req.body),
);

exports.updateProject = catchAsync(async (req, res) =>
  handleServiceRequest(res, projectService.updateProject, httpStatus.OK, req.body),
);

exports.getAllProject = catchAsync(async (req, res) =>
  handleServiceRequest(res, projectService.getAllProject, httpStatus.OK),
);

exports.getRecomendedProject = catchAsync(async (req, res) =>
  handleServiceRequest(res, projectService.getRecomendedProject, httpStatus.OK),
);

exports.getOverallPlatformStatus = catchAsync(async (req, res) =>
  handleServiceRequest(res, projectService.getOverallPlatformStatus, httpStatus.OK),
);

exports.getSingleProjectStatus = catchAsync(async (req, res) =>
  // eslint-disable-next-line max-len
  handleServiceRequest(res, projectService.getSingleProjectStatus, httpStatus.OK, req.query.projectid),
);

exports.getSingleProject = catchAsync(async (req, res) =>
  handleServiceRequest(res, projectService.getSingleProject, httpStatus.OK, req.query.projectid),
);

exports.searchProjects = catchAsync(async (req, res) =>
  handleServiceRequest(res, projectService.searchProjects, httpStatus.OK, req.query.searchquery),
);

exports.deleteProject = catchAsync(async (req, res) =>
  handleServiceRequest(res, projectService.deleteProject, httpStatus.OK, req.params.projectid),
);

exports.getRecentFiveBackers = catchAsync(async (req, res) =>
  // eslint-disable-next-line max-len
  handleServiceRequest(res, projectService.getRecentBackersForProject, httpStatus.OK, req.query.projectid),
);

exports.uploadImage = catchAsync(async (req, res) =>
  handleServiceRequest(res, projectService.uploadImage, httpStatus.OK, req.files),
);

exports.uploadVideo = catchAsync(async (req, res) =>
  handleServiceRequest(res, projectService.uploadVideo, httpStatus.OK, req.files),
);

exports.streamImage = catchAsync(async (req, res) => {
  const { filename } = req.query;
  await projectService.streamImage(res, filename);
});

exports.streamVideo = catchAsync(async (req, res) => {
  const { filename } = req.query;
  await projectService.streamVideo(res, filename);
});
