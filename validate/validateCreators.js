const Joi = require('joi');

const validateCreator = (req, res, next) => {
  const creatorValidationSchema = Joi.object({
    username: Joi.string().min(5).required(),
    about: Joi.string().min(25),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
    userimage: Joi.string(),
    following: Joi.array().items(Joi.string()),
    interest: Joi.array().items(Joi.string()),
  }).unknown();

  const { error } = creatorValidationSchema.validate(req.body);
  if (error) {
    next(error);
  } else {
    next();
  }
};

module.exports = validateCreator;
