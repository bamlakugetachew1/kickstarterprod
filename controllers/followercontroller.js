const Follower = require('../models/folllower.model');
const catchAsync = require('../utils/catchAsync');

exports.followcreators = catchAsync(async (req, res) => {
  const follower = new Follower(req.body);
  await follower.save();
  res.status(201).json({
    message: 'succesfully followed the creators',
  });
});
