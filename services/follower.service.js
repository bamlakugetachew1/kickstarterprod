const httpStatus = require('http-status');
const { Creator, Follower } = require('../models');
const { ApiError, isValidObjectId } = require('../utils');

const followCreator = async (followerid, followedid) => {
  if (!isValidObjectId(followerid) || !isValidObjectId(followedid)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Missing or invalid ids');
  }
  const followingUser = await Creator.findOne({ _id: followerid });
  if (followingUser.following.includes(followedid)) {
    await Creator.findByIdAndUpdate(followerid, {
      $pull: { following: followedid },
    });
    await Follower.findOneAndDelete({ followerid, followedid });
    return 'Successfully unfollowed creator';
  }
  await Creator.findByIdAndUpdate(followerid, {
    $push: { following: followedid },
  });
  const newfollower = new Follower({ followerid, followedid });
  await newfollower.save();
  return 'Successfully followed creator';
};

module.exports = { followCreator };
