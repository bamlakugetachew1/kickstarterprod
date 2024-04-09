const mongoose = require('mongoose');

const followerSchema = new mongoose.Schema(
  {
    followerid: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'followerid is a required field'],
      ref: 'Creator',
    },
    followedid: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'followedid is a required field'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const Follower = mongoose.model('Follower', followerSchema);
module.exports = Follower;
