const httpStatus = require('http-status');
const { Creator, FavouriteProject, BackedProject, MyProject } = require('../models');
const { ApiError, hashPassword, compareHashes, generateToken, isValidObjectId } = require('../utils');

const checkCreatorId = (creatorid) => {
  if (!isValidObjectId(creatorid)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Creator ID is either invalid or missing');
  }
};

const createCreators = async (userBody) => {
  const existingUser = await Creator.findOne({ email: userBody.email });

  if (existingUser) {
    throw new ApiError(httpStatus.CONFLICT, 'This email is already registered');
  }

  const hashedPassword = await hashPassword(userBody.password);
  const newUser = { ...userBody, password: hashedPassword };

  await Creator.create(newUser);
  return 'User created successfully';
};

const loginCreator = async (userBody) => {
  const { email, password } = userBody;
  if (!email || !password) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'either email or password is missing');
  }
  const existingUser = await Creator.findOne({ email });
  if (!existingUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Email not found in our system');
  }

  const validatePassword = await compareHashes(password, existingUser.password);

  if (!validatePassword) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect password');
  }
  const accessToken = generateToken(existingUser);
  return {
    message: 'Success. You are now logged in.',
    // eslint-disable-next-line no-underscore-dangle
    userid: existingUser._id,
    email: existingUser.email,
    username: existingUser.username,
    accessToken,
  };
};

const individualCreatorsDetails = async (creatorid) => {
  checkCreatorId(creatorid);
  const creator = await Creator.findOne({ _id: creatorid }).select('-password -email -following');

  if (!creator) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Creator not found');
  }
  return creator;
};

const getFavourites = async (creatorid) => {
  checkCreatorId(creatorid);
  const favourites = await FavouriteProject.find({ creatorid })
    .select('projectid')
    .populate({
      path: 'projectid',
      select: '-reward -updates -videoLink',
      options: { limit: 5 },
    });

  if (!favourites.length) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No favorites added by the creator');
  }

  return favourites;
};

const getBackedProjects = async (creatorid) => {
  checkCreatorId(creatorid);
  const backedProjects = await BackedProject.find({ creatorid })
    .select('projectid')
    .populate({
      path: 'projectid',
      select: '-reward -updates -videoLink',
      options: { limit: 5 },
    });

  if (!backedProjects.length) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No backed projects found');
  }

  return backedProjects;
};

const getMyListedProjects = async (creatorid) => {
  checkCreatorId(creatorid);
  const myProjects = await MyProject.find({ creatorid })
    .select('projectid')
    .populate({
      path: 'projectid',
      select: '-reward -updates -videoLink',
      options: { limit: 5 },
    });

  if (!myProjects.length) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No listed projects found');
  }

  return myProjects;
};

const updateAccountDetails = async (userid, userBody) => {
  if (userBody.password) {
    // eslint-disable-next-line no-param-reassign
    userBody.password = await hashPassword(userBody.password);
  }

  const updatedAccount = await Creator.findByIdAndUpdate(userid, { $set: userBody }, { new: true });

  if (!updatedAccount) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Account not found');
  }
  return 'Account details updated successfully.';
};

const toggleVisibility = async (userid) => {
  const creator = await Creator.findById(userid);
  if (!creator) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No user found');
  }
  creator.visibility = creator.visibility === 'public' ? 'private' : 'public';
  await creator.save();
  return `Your profile made ${creator.visibility}`;
};

module.exports = {
  createCreators,
  loginCreator,
  individualCreatorsDetails,
  getFavourites,
  getBackedProjects,
  getMyListedProjects,
  updateAccountDetails,
  toggleVisibility,
};
