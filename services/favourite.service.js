const httpStatus = require('http-status');
const { FavouriteProject } = require('../models');
const { ApiError } = require('../utils');

const addToFavourites = async (projectid, creatorid) => {
  if (!projectid || !creatorid) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Either project id or creator id is missing');
  }
  const alreadyAddedToFavourites = await FavouriteProject.findOne({ projectid, creatorid });
  if (!alreadyAddedToFavourites) {
    const newFavourites = new FavouriteProject({ projectid, creatorid });
    await newFavourites.save();
    return 'Successfully added to favourites';
  }

  await FavouriteProject.findOneAndDelete({ projectid, creatorid });
  return 'Successfully removed from favourites';
};

module.exports = { addToFavourites };
