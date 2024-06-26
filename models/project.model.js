const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'title is a required field'],
      minlength: 5,
    },
    descreptons: {
      type: String,
      required: [true, 'Descreptons is a required field'],
      minlength: 50,
    },
    catagory: {
      type: [String],
      default: [],
      required: [true, 'Catagory array is required'],
      validate: {
        validator(val) {
          return val.length >= 2;
        },
        message: 'Catagory array must have at least 2 items',
      },
    },
    goal: {
      type: Number,
      required: [true, 'funding goal is a required field'],
      validate: {
        validator(value) {
          return value > 0;
        },
        message: (props) => `${props.value} is not a valid funding goal, it must be greater than zero`,
      },
    },
    reward: {
      type: [String],
      default: [],
    },
    updates: {
      type: [String],
      default: [],
    },
    imagesLink: {
      type: [String],
      default: [],
      required: [true, 'Images array is required'],
      validate: {
        validator(val) {
          return val.length >= 1;
        },
        message: 'Images array must have at least 1 items',
      },
    },
    videoLink: {
      type: String,
    },
    creator: {
      type: mongoose.Schema.Types.Object,
      required: true,
      default: {},
    },
    amountReached: {
      type: Number,
    },
    deadline: {
      type: Date,
      required: [true, 'A valid date is required'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
projectSchema.virtual('percentfunded').get(function () {
  return (this.amountReached * 100) / this.goal;
});

projectSchema.virtual('daysLeft').get(function () {
  const deadlineDate = new Date(this.deadline);
  const today = new Date();
  const differenceMilliseconds = deadlineDate.getTime() - today.getTime();
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const differenceDays = Math.ceil(differenceMilliseconds / millisecondsPerDay);
  return differenceDays;
});

projectSchema.index({ title: 'text', descreptons: 'text', catagory: 'text' });
const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
