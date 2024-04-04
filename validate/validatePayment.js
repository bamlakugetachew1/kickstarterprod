const Joi = require('joi');

const validatePayment = (req, res, next) => {
  const paymentValidationSchema = Joi.object({
    projectid: Joi.string().required(),
    payerid: Joi.string().required(),
    amount: Joi.number().positive().required(),
    paymentmethod: Joi.string().required(),
  });

  const { error } = paymentValidationSchema.validate(req.body);
  if (error) {
    next(error);
  } else {
    next();
  }
};

module.exports = validatePayment;
