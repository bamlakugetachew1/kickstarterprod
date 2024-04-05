const bcrypt = require('bcrypt');
const Creator = require('../models/creators.model');
const catchAsync = require('../utils/catchAsync');
const generateToken = require('../utils/generateToken');

// eslint-disable-next-line consistent-return
exports.createcreators = catchAsync(async (req, res) => {
  const existingUser = await Creator.findOne({ email: req.body.email });

  if (existingUser) {
    return res.status(400).json({
      message: 'This email is already registered',
    });
  }

  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);

  const creator = new Creator(req.body);
  await creator.save();

  res.status(200).json({
    message: 'User created successfully',
  });
});

// eslint-disable-next-line consistent-return
exports.loginCreator = catchAsync(async (req, res) => {
  const creator = await Creator.findOne({ email: req.body.email });
  if (!creator) {
    return res.status(400).json({
      message: 'email is not found in our system',
    });
  }
  const validate = await bcrypt.compare(req.body.password, creator.password);
  if (!validate) {
    return res.status(401).json({
      message: 'Incorrect password.',
    });
  }
  const accessToken = generateToken(creator);
  res.status(200).json({
    message: 'Success. You are now logged in.',
    // eslint-disable-next-line no-underscore-dangle
    userid: creator._id,
    email: creator.email,
    username: creator.username,
    accessToken,
  });
});
