const Payment = require('../models/payments.model');
const catchAsync = require('../utils/catchAsync');

exports.fundProjects = catchAsync(async (req, res) => {
  const payementmethod = 'chapa';
  const payment = new Payment({
    projectid: req.body.projectid,
    payerid: req.body.payerid,
    amount: req.body.amount,
    payementmethod,
  });
  await payment.save();
  res.status(201).json({
    message: 'succesfully backed project thanks for supporting',
  });
});
