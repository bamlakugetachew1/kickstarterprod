const mongoose = require('mongoose');

const creatorSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'username is a required field'],
      minlength: 5,
    },
    email: {
      type: String,
      required: [true, 'Email is a required field'],
      validate: {
        validator(v) {
          return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    password: {
      type: String,
      required: [true, 'password is a required field'],
      minlength: 5,
    },
    myproject: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
      },
    ],
    userimage: {
      type: String,
    },
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Creator',
      },
    ],
    favourites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const Creator = mongoose.model('Creator', creatorSchema);
module.exports = Creator;
