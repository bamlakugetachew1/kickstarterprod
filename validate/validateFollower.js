const Joi = require('joi');

const validateFollower = (req, res, next) => {
  const followerValidationSchema = Joi.object({
    followerid: Joi.string().required(),
    followedid: Joi.string().required(),
  });
  const { error } = followerValidationSchema.validate(req.body);
  if (error) {
    next(error);
  } else {
    next();
  }
};

module.exports = validateFollower;
