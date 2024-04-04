const Creator = require('../models/creators.model');
const catchAsync = require('../utils/catchAsync');

exports.createcreators = catchAsync(async (req, res) => {
  const creator = new Creator(req.body);
  await creator.save();
  res.status(201).json({
    message: 'creator added succesfully',
  });
});
