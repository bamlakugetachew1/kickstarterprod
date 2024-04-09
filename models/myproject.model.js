const mongoose = require('mongoose');

const myprojectSchema = new mongoose.Schema(
  {
    projectid: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'projectid is a required field'],
      ref: 'Project',
    },
    creatorid: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'creatorid is a required field'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const MyProject = mongoose.model('MyProject', myprojectSchema);
module.exports = MyProject;
