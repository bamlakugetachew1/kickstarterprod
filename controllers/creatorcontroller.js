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

exports.indivisualCreatorsDetails = catchAsync(async (req, res) => {
  const { creatorid } = req.query;
  const creator = await Creator.findOne({ _id: creatorid }).select({
    password: 0,
    email: 0,
    following: 0,
  });
  if (!creator) {
    return res.status(404).json({ error: 'No creators found' });
  }
  return res.status(200).json({ creator });
});

exports.getFavourites = catchAsync(async (req, res) => {
  const { creatorid } = req.query;
  const favourites = await Creator.findOne({ _id: creatorid })
    .select('favourites')
    .populate({
      path: 'favourites',
      select: '-reward -updates -videoLink',
      options: { limit: 8 },
    });
  if (favourites.length === 0) {
    return res.status(404).json({ error: 'No favourites added by the creator' });
  }
  return res.status(200).json({ favourites });
});

exports.getBackedProjects = catchAsync(async (req, res) => {
  const { creatorid } = req.query;
  const backedproject = await Creator.findOne({ _id: creatorid })
    .select('backedproject')
    .populate({
      path: 'backedproject',
      select: '-reward -updates -videoLink',
      options: { limit: 8 },
    });
  if (backedproject.length === 0) {
    return res.status(404).json({ error: 'Not backedproject yet' });
  }
  return res.status(200).json({ backedproject });
});

exports.getMyListedProjects = catchAsync(async (req, res) => {
  const { creatorid } = req.query;
  const myproject = await Creator.findOne({ _id: creatorid })
    .select('myproject')
    .populate({
      path: 'myproject',
      select: '-reward -updates -videoLink',
      options: { limit: 8 },
    });
  if (myproject.length === 0) {
    return res.status(404).json({ error: 'Not Listed project yet' });
  }
  return res.status(200).json({ myproject });
});
