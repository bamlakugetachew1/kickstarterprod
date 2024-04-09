const mongoose = require('mongoose');

const creatorSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'username is a required field'],
      minlength: 5,
    },
    about: {
      type: String,
      minlength: 25,
    },
    email: {
      type: String,
      required: [true, 'Email is a required field'],
      unique: true,
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
    userimage: {
      type: String,
    },
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Creator',
      },
    ],
    interest: {
      type: [String],
      default: [],
    },
    visibility: {
      type: String,
      enum: ['public', 'private'],
      default: 'public',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const Creator = mongoose.model('Creator', creatorSchema);
module.exports = Creator;
