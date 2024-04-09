const Joi = require('joi');

const validateFavourits = (req, res, next) => {
  const favouritsValidationSchema = Joi.object({
    projectid: Joi.string().required(),
    creatorid: Joi.string().required(),
  });
  const { error } = favouritsValidationSchema.validate(req.body);
  if (error) {
    next(error);
  } else {
    next();
  }
};

module.exports = validateFavourits;
