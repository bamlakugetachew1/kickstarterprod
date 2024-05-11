const Joi = require('joi');

const validatePayment = (req, res, next) => {
  const paymentValidationSchema = Joi.object({
    projectid: Joi.string().required(),
    payerid: Joi.string().required(),
    amount: Joi.number().positive().required(),
    message: Joi.string(),
  }).unknown();

  const { error } = paymentValidationSchema.validate(req.body);
  if (error) {
    next(error);
  } else {
    next();
  }
};

module.exports = validatePayment;
