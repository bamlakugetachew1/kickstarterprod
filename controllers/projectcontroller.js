const Project = require('../models/project.model');
const catchAsync = require('../utils/catchAsync');

exports.createproject = catchAsync(async (req, res) => {
  const project = new Project(req.body);
  await project.save();
  res.status(201).json({
    message: 'project added succesfully',
  });
});
