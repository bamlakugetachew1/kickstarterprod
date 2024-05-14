const Joi = require('joi');

const validateProject = (req, res, next) => {
  const projectValidationSchema = Joi.object({
    title: Joi.string().min(5).required(),
    descreptons: Joi.string().min(50).required(),
    catagory: Joi.array().items(Joi.string()).min(2).required(),
    goal: Joi.number().required(),
    reward: Joi.array().items(Joi.string()),
    updates: Joi.array().items(Joi.string()),
    imagesLink: Joi.array().items(Joi.string()).min(1).required(),
    videoLink: Joi.string().allow(null, ''),
    creator: Joi.object({
      username: Joi.string().required(),
      userid: Joi.string().required(),
    }).required(),
    amountReached: Joi.number().allow(null),
    deadline: Joi.date().required(),
  }).unknown();

  const { error } = projectValidationSchema.validate(req.body);
  if (error) {
    next(error);
  }

  next();
};

const validateUpdatedProject = (req, res, next) => {
  const updatedProjectValidationSchema = Joi.object({
    projectid: Joi.string(),
    title: Joi.string().min(5),
    descreptons: Joi.string().min(50),
    catagory: Joi.array().items(Joi.string()).min(2),
    reward: Joi.array().items(Joi.string()),
    updates: Joi.array().items(Joi.string()),
  });

  const { error } = updatedProjectValidationSchema.validate(req.body);
  if (error) {
    next(error);
  }

  next();
};

module.exports = { validateProject, validateUpdatedProject };
