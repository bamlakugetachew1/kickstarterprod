const Payment = require('../models/payments.model');
const catchAsync = require('../utils/catchAsync');

exports.fundProjects = catchAsync(async (req, res) => {
  const payment = new Payment(req.body);
  await payment.save();
  res.status(201).json({
    message: 'succesfully backed project thanks for supporting',
  });
});
