const path = require('path');
const fs = require('fs');
const zlib = require('zlib');
const mongoose = require('mongoose');
const Project = require('../models/project.model');
const Payment = require('../models/payments.model');
const MyProject = require('../models/myproject.model');
const FavouriteProject = require('../models/favourites.model');
const BackedProject = require('../models/backedproject.model');
const catchAsync = require('../utils/catchAsync');
const { imageProcessor, videoProcessor } = require('../background-tasks');
const getContentType = require('../utils/getContentType');
const recomendedProjectAggregate = require('../aggregateQuery/recomendedProjectAggregate');
const totalFundingRaisedAggregate = require('../aggregateQuery/totalFundingRaisedAggregate');
const getSingleProjectStatusAggregate = require('../aggregateQuery/SingleProjectStatusAggregate'); // Assuming the file path is correct

exports.createproject = catchAsync(async (req, res) => {
  const project = new Project(req.body);
  const result = await project.save();
  if (!result) {
    return res.status(500).json({
      error: 'Failed to create project.',
    });
  }
  const myproject = new MyProject({
    // eslint-disable-next-line no-underscore-dangle
    projectid: result._id,
    creatorid: result.creator.userid,
  });
  const myProjectResult = await myproject.save();
  if (!myProjectResult) {
    // eslint-disable-next-line no-underscore-dangle
    await Project.findByIdAndDelete(result._id);
    return res.status(500).json({
      error: 'Failed to create associated MyProject.',
    });
  }
  return res.status(201).json({
    message: 'Project added successfully.',
  });
});

exports.updateproject = catchAsync(async (req, res) => {
  const { projectid } = req.body;
  if (!projectid) {
    return res.status(400).json({
      error: 'Project ID is required.',
    });
  }
  const updatedProject = await Project.findByIdAndUpdate(projectid, { $set: req.body });
  if (!updatedProject) {
    return res.status(404).json({
      error: 'Project not found.',
    });
  }
  return res.status(200).json({
    message: 'Project updated successfully.',
  });
});

exports.getAllProject = catchAsync(async (req, res) => {
  const projects = await Project.find()
    .select({ reward: 0, updates: 0, videoLink: 0 })
    .limit(8)
    .sort({ createdAt: -1 });
  if (projects.length === 0) {
    return res.status(404).json({ error: 'No projects found' });
  }
  return res.status(200).json({ projects });
});

exports.getRecomendedProject = catchAsync(async (req, res) => {
  const projects = await Project.aggregate(recomendedProjectAggregate);
  if (projects.length === 0) {
    return res.status(404).json({ error: 'No projects found' });
  }
  return res.status(200).json({ projects });
});

exports.getOverallPlatformStatus = catchAsync(async (req, res) => {
  const totalnumberofdonations = await Payment.aggregate(totalFundingRaisedAggregate);
  const numberofprojects = await Payment.distinct('projectid');
  const pledges = await Payment.countDocuments();
  const totalAmount = totalnumberofdonations ? totalnumberofdonations[0].totalAmount : 0;

  return res.status(200).json({
    totalnumberofdonations: totalAmount,
    numberofprojects: numberofprojects.length,
    pledges,
  });
});

exports.getSingleProjectStatus = catchAsync(async (req, res) => {
  const { projectid } = req.query;
  if (!projectid) {
    return res.status(400).json({ error: 'Project ID is required in query parameters' });
  }
  const singleProjectStatusAggregate = getSingleProjectStatusAggregate(projectid);
  const singlestats = await Payment.aggregate(singleProjectStatusAggregate);
  return res.status(200).json({ singlestats });
});

exports.getSingleProject = catchAsync(async (req, res) => {
  const { projectid } = req.query;
  if (!projectid) {
    return res.status(400).json({ error: 'Project ID is required in query parameters' });
  }
  const project = await Project.findOne({ _id: projectid }).select();
  if (!project) {
    return res.status(404).json({ error: 'No project found' });
  }
  return res.status(200).json({ project });
});

exports.searchprojects = catchAsync(async (req, res) => {
  const { searchquery } = req.query;
  if (!searchquery) {
    return res.status(400).json({ error: 'Search query is required in query parameters' });
  }
  const projects = await Project.find({ $text: { $search: searchquery } }).limit(8);
  if (projects.length === 0) {
    return res.status(404).json({ message: 'No results found' });
  }
  return res.status(200).json({ projects });
});

exports.deleteProject = catchAsync(async (req, res) => {
  const { projectid } = req.params;
  const objectid = new mongoose.Types.ObjectId(projectid.trim());
  const deletedProject = await Project.findByIdAndDelete(objectid);

  if (!deletedProject) {
    return res.status(404).json({ error: 'Project not found' });
  }
  await Payment.deleteMany({ projectid });
  await MyProject.deleteMany({ projectid });
  await BackedProject.deleteMany({ projectid });
  await FavouriteProject.deleteMany({ projectid });

  return res.status(200).json({ message: 'Project deleted successfully.' });
});

exports.getRecentFiveBackers = catchAsync(async (req, res) => {
  const { projectid } = req.query;
  if (!projectid) {
    return res.status(400).json({ error: 'Project ID is required in query parameters' });
  }
  const specificPayerIds = await Payment.find({ projectid }).select('payerid');
  const array = specificPayerIds.map((payer) => payer.payerid);
  const payers = await Payment.find({
    projectid,
    payerid: { $in: array },
  })
    .select('payerid')
    .populate({
      path: 'payerid',
      options: { limit: 5 },
      select: '-backedproject -password  -following -favourites -myproject',
    });
  if (payers.length === 0) {
    return res.status(404).json({ error: 'Not Backed by anyone yet' });
  }
  return res.status(200).json({ payers });
});

exports.uploadImage = catchAsync(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const filenames = req.files.map((file) => file.filename);
  await imageProcessor.Queue.add('imageprocessor', {
    filenames,
  });
  await imageProcessor.Worker();
  return res.status(200).json({ filenames });
});

exports.uploadVideo = catchAsync(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const { filename } = req.files[0];
  await videoProcessor.Queue.add('videoprocessor', {
    filename,
  });
  await videoProcessor.Worker();
  return res.status(200).json({ filename });
});

// eslint-disable-next-line consistent-return
exports.createImageReadStream = catchAsync(async (req, res) => {
  const { filename } = req.query;
  if (!filename) {
    return res.status(400).json({ error: 'Filename is required in query parameters' });
  }
  const fullPath = path.join(__dirname, '..', 'compressedimages', filename);

  if (!fs.existsSync(fullPath)) {
    return res.status(404).json({ error: 'File not found' });
  }

  const contentType = getContentType(filename);
  res.setHeader('Content-Type', contentType);

  const readStream = fs.createReadStream(fullPath);
  readStream.on('open', () => {
    readStream.pipe(res);
  });
  readStream.on('error', (err) => {
    res.status(500).send(err);
  });
});

// eslint-disable-next-line consistent-return
exports.createVideoReadStream = catchAsync(async (req, res) => {
  const { filename } = req.query;
  if (!filename) {
    return res.status(400).json({ error: 'Filename is required in query parameters' });
  }
  const videoPath = path.join(__dirname, '..', 'compressedvideo', `${filename}.gz`);

  if (!fs.existsSync(videoPath)) {
    return res.status(404).json({ error: 'File not found' });
  }

  const contentType = getContentType(filename);
  res.setHeader('Content-Type', contentType);

  const readStream = fs.createReadStream(videoPath);
  readStream.pipe(zlib.createGunzip()).pipe(res);

  readStream.on('error', (err) => {
    res.status(500).send(err);
  });
});
