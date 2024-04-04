const Joi = require('joi');

const validateCreator = (req, res, next) => {
  const creatorValidationSchema = Joi.object({
    username: Joi.string().min(5).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
    userimage: Joi.string(),
    following: Joi.array().items(Joi.string()),
    favourites: Joi.array().items(Joi.string()),
  });

  const { error } = creatorValidationSchema.validate(req.body);
  if (error) {
    next(error);
  } else {
    next();
  }
};

module.exports = validateCreator;
