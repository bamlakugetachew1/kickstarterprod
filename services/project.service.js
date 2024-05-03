const httpStatus = require('http-status');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const zlib = require('zlib');
const { Project, MyProject, Payment, BackedProject, FavouriteProject } = require('../models');
const { ApiError, getContentType } = require('../utils');
const aggregateQuery = require('../aggregateQuery');
const { imageProcessor, videoProcessor } = require('../background-tasks');

const checkProjectId = (projectid) => {
  if (!projectid) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Project ID is a required field');
  }
};

const streamFile = async (res, fileName, fileDirectory, isVideoFile = false) => {
  if (!fileName) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Filename is required');
  }
  const filePath = path.join(__dirname, '..', fileDirectory, isVideoFile ? `${fileName}.gz` : fileName);
  if (!fs.existsSync(filePath)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'File not found');
  }
  const contentType = getContentType(fileName);
  res.setHeader('Content-Type', contentType);
  const readStream = fs.createReadStream(filePath);
  if (isVideoFile) {
    readStream.pipe(zlib.createGunzip()).pipe(res);
  } else {
    readStream.pipe(res);
  }
  readStream.on('error', (err) => {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err);
  });
};

const createProject = async (projectData) => {
  const newProject = new Project(projectData);
  const savedProject = await newProject.save();

  if (!savedProject) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to create project');
  }

  const associatedProject = new MyProject({
    // eslint-disable-next-line no-underscore-dangle
    projectid: savedProject._id,
    creatorid: savedProject.creator.userid,
  });

  const savedAssociatedProject = await associatedProject.save();

  if (!savedAssociatedProject) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to create associated project');
  }
};

const updateProject = async (projectData) => {
  const { projectid } = projectData;
  checkProjectId(projectid);
  const updatedProject = await Project.findByIdAndUpdate(projectid, { $set: projectData });
  if (!updatedProject) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
  }
};

const getAllProject = async () => {
  const projects = await Project.find()
    .select({ reward: 0, updates: 0, videoLink: 0 })
    .limit(8)
    .sort({ createdAt: -1 });
  if (!projects.length) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No projects found');
  }
  return projects;
};

const getRecomendedProject = async () => {
  const projects = await Project.aggregate(aggregateQuery.recommendedProjectAggregate);
  if (!projects.length) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No recomended projects found');
  }
  return projects;
};

const getOverallPlatformStatus = async () => {
  const totalAmountPromise = Payment.aggregate(aggregateQuery.totalFundingRaisedAggregate);
  const projectsPromise = Payment.distinct('projectid');
  const pledgesPromise = Payment.countDocuments();
  const [totalAmountResult, projects, pledges] = await Promise.all([
    totalAmountPromise,
    projectsPromise,
    pledgesPromise,
  ]);

  const totalAmount = totalAmountResult.length > 0 ? totalAmountResult[0].totalAmount : 0;
  return {
    numberofdonations: totalAmount,
    numberofprojects: projects.length,
    pledges,
  };
};

const getSingleProjectStatus = async (projectid) => {
  checkProjectId(projectid);
  const singleProjectStatusAggregate = aggregateQuery.getSingleProjectStatusAggregate(projectid);
  const singleProjectStatus = await Payment.aggregate(singleProjectStatusAggregate);
  return singleProjectStatus;
};

const getSingleProject = async (projectid) => {
  checkProjectId(projectid);
  const singleProject = await Project.findOne({ _id: projectid });
  if (!singleProject) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No project found');
  }
  return singleProject;
};

const searchProjects = async (searchQuery) => {
  if (!searchQuery) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Search query is a required field');
  }
  const searchedProjects = await Project.find({ $text: { $search: searchQuery } }).limit(8);
  if (!searchedProjects) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No results found');
  }
  return searchedProjects;
};

const deleteProject = async (projectid) => {
  checkProjectId(projectid);
  const objectId = new mongoose.Types.ObjectId(projectid.trim());
  const deletedProject = await Project.findByIdAndDelete(objectId);
  if (!deletedProject) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
  }

  await Promise.all([
    Payment.deleteMany({ projectid }),
    MyProject.deleteMany({ projectid }),
    BackedProject.deleteMany({ projectid }),
    FavouriteProject.deleteMany({ projectid }),
  ]);
};

const getRecentBackersForProject = async (projectId) => {
  checkProjectId(projectId);
  const payerIds = await Payment.find({ projectid: projectId }).select('payerid');
  const payerIdsArray = payerIds.map((payer) => payer.payerid);
  const recentBackers = await Payment.find({
    projectid: projectId,
    payerid: { $in: payerIdsArray },
  })
    .select('payerid')
    .populate({
      path: 'payerid',
      options: { limit: 5 },
      select: '-backedproject -password  -following -favourites -myproject',
    });

  if (!recentBackers.length) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No backers found for this project');
  }

  return recentBackers;
};

const uploadImage = async (files) => {
  if (!files || files.length === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No file uploaded');
  }
  const filenames = files.map((file) => file.filename);
  await imageProcessor.Queue.add('imageprocessor', {
    filenames,
  });
  await imageProcessor.Worker();
  return filenames;
};

const uploadVideo = async (files) => {
  if (!files || files.length === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No file uploaded');
  }
  const { filename } = files[0];
  await videoProcessor.Queue.add('videoprocessor', {
    filename,
  });
  await videoProcessor.Worker();
  return filename;
};

const streamImage = async (res, fileName) => {
  streamFile(res, fileName, 'compressedimages');
};

const streamVideo = async (res, filename) => {
  streamFile(res, filename, 'compressedvideo', true);
};

module.exports = {
  createProject,
  updateProject,
  getAllProject,
  getRecomendedProject,
  getOverallPlatformStatus,
  getSingleProjectStatus,
  getSingleProject,
  searchProjects,
  deleteProject,
  getRecentBackersForProject,
  uploadImage,
  uploadVideo,
  streamImage,
  streamVideo,
};
