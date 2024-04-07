const path = require('path');
const fs = require('fs');
const zlib = require('zlib');
const Project = require('../models/project.model');
const Payment = require('../models/payments.model');
const catchAsync = require('../utils/catchAsync');
const { imageProcessor, videoProcessor } = require('../background-tasks');
const getContentType = require('../utils/getContentType');
const recomendedProjectAggregate = require('../aggregateQuery/recomendedProjectAggregate');
const totalFundingRaisedAggregate = require('../aggregateQuery/totalFundingRaisedAggregate');
const getSingleProjectStatusAggregate = require('../aggregateQuery/SingleProjectStatusAggregate'); // Assuming the file path is correct

exports.createproject = catchAsync(async (req, res) => {
  const project = new Project(req.body);
  await project.save();
  res.status(201).json({
    message: 'project added succesfully',
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
  return res.status(200).json({
    totalnumberofdonations: totalnumberofdonations[0].totalAmount,
    numberofprojects: numberofprojects.length,
    pledges,
  });
});

exports.getSingleProjectStatus = catchAsync(async (req, res) => {
  const { projectid } = req.query;
  const SingleProjectStatusAggregate = getSingleProjectStatusAggregate(projectid);
  const singlestats = await Payment.aggregate(SingleProjectStatusAggregate);

  return res.status(200).json({
    singlestats,
  });
});

exports.getSingleProject = catchAsync(async (req, res) => {
  const { projectid } = req.query;
  const project = await Project.findOne({ _id: projectid }).select();
  if (!project) {
    return res.status(404).json({ error: 'No project found' });
  }
  return res.status(200).json({ project });
});

exports.searchprojects = catchAsync(async (req, res) => {
  const { searchquery } = req.query;
  const projects = await Project.find({ $text: { $search: searchquery } });
  if (projects.length === 0) {
    return res.status(404).json({ message: 'No results found' });
  }
  return res.status(200).json({ projects });
});

exports.uploadImage = catchAsync(async (req, res) => {
  if (!req.files) {
    res.status(400).json({ error: 'No file uploaded' });
  }
  const filenames = req.files.map((file) => file.filename);
  await imageProcessor.Queue.add('imageprocessor', {
    filenames,
  });
  await imageProcessor.Worker();
  res.status(200).json({ filenames });
});

exports.uploadVideo = catchAsync(async (req, res) => {
  if (!req.files) {
    res.status(400).json({ error: 'No file uploaded' });
  }
  const { filename } = req.files[0];
  await videoProcessor.Queue.add('videoprocessor', {
    filename,
  });
  await videoProcessor.Worker();
  res.status(200).json({ filename });
});

// eslint-disable-next-line consistent-return
exports.createImageReadStream = catchAsync(async (req, res) => {
  const { filename } = req.query;
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
