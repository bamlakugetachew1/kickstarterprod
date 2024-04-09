const Creator = require('../models/creators.model');
const MyProject = require('../models/myproject.model');
const FavouriteProject = require('../models/favourites.model');
const BackedProject = require('../models/backedproject.model');
const catchAsync = require('../utils/catchAsync');
const generateToken = require('../utils/generateToken');
const compareHashes = require('../utils/compareHashes');
const hashPassword = require('../utils/hashPassword');
// eslint-disable-next-line consistent-return
exports.createcreators = catchAsync(async (req, res) => {
  const existingUser = await Creator.findOne({ email: req.body.email });

  if (existingUser) {
    return res.status(400).json({
      message: 'This email is already registered',
    });
  }

  req.body.password = await hashPassword(req.body.password);
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
  const validate = await compareHashes(req.body.password, creator.password);
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
  if (!creatorid) {
    return res.status(400).json({ error: 'Creator ID is required in query parameters' });
  }
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
  if (!creatorid) {
    return res.status(400).json({ error: 'Creator ID is required in query parameters' });
  }
  const favourites = await FavouriteProject.find({ creatorid })
    .select('projectid')
    .populate({
      path: 'projectid',
      select: '-reward -updates -videoLink',
      options: { limit: 5 },
    });
  if (favourites.length === 0) {
    return res.status(404).json({ error: 'No favourites added by the creator' });
  }
  return res.status(200).json({ favourites });
});

exports.getBackedProjects = catchAsync(async (req, res) => {
  const { creatorid } = req.query;
  if (!creatorid) {
    return res.status(400).json({ error: 'Creator ID is required in query parameters' });
  }
  const backedproject = await BackedProject.find({ creatorid })
    .select('projectid')
    .populate({
      path: 'projectid',
      select: '-reward -updates -videoLink',
      options: { limit: 5 },
    });
  if (backedproject.length === 0) {
    return res.status(404).json({ error: 'Not backedproject yet' });
  }
  return res.status(200).json({ backedproject });
});

exports.getMyListedProjects = catchAsync(async (req, res) => {
  const { creatorid } = req.query;
  if (!creatorid) {
    return res.status(400).json({ error: 'Creator ID is required in query parameters' });
  }
  const myproject = await MyProject.find({ creatorid })
    .select('projectid')
    .populate({
      path: 'projectid',
      select: '-reward -updates -videoLink',
      options: { limit: 5 },
    });
  if (myproject.length === 0) {
    return res.status(404).json({ error: 'Not Listed project yet' });
  }
  return res.status(200).json({ myproject });
});

exports.updateAccountDetails = catchAsync(async (req, res) => {
  if (req.body.password) {
    req.body.password = await hashPassword(req.body.password);
  }
  // eslint-disable-next-line max-len, no-underscore-dangle
  const updateAccountDetails = await Creator.findByIdAndUpdate(req.user.user._id, { $set: req.body });
  if (!updateAccountDetails) {
    return res.status(404).json({
      error: 'Account not found.',
    });
  }
  return res.status(200).json({
    message: 'Account Details updated successfully.',
  });
});

exports.changevisibility = catchAsync(async (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  const creator = await Creator.findById(req.user.user._id);
  if (!creator) {
    return res.status(404).json({ error: 'No user found' });
  }
  if (creator.visibility === 'public') {
    creator.visibility = 'private';
    await creator.save();
    return res.status(200).json({ success: 'Your profile made private' });
  }
  creator.visibility = 'public';
  await creator.save();
  return res.status(200).json({ success: 'Your profile made Public' });
});
