const Follower = require('../models/folllower.model');
const Creator = require('../models/creators.model');
const catchAsync = require('../utils/catchAsync');

exports.followcreators = catchAsync(async (req, res) => {
  const { followerid, followedid } = req.body;
  const users = await Creator.findOne({ _id: followerid });
  if (users.following.includes(followedid)) {
    await Creator.findByIdAndUpdate(followerid, {
      $pull: { following: followedid },
    });
    await Follower.findOneAndDelete({ followerid, followedid });
    return res.status(200).json({ message: 'Successfully unfollowed' });
  }
  await Creator.findByIdAndUpdate(followerid, {
    $push: { following: followedid },
  });
  const newfollower = new Follower({ followerid, followedid });
  await newfollower.save();
  return res.status(200).json({ message: 'Successfully followed' });
});
