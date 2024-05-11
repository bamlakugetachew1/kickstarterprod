const { Payment, Project, BackedProject } = require('../models');
const { payment } = require('../utils');
const { PaypalAccessToken } = require('../config/env.config');

const saveBackedProjects = async (projectid, creatorid) => {
  const BackedProjects = new BackedProject({
    projectid,
    creatorid,
  });
  await BackedProjects.save();
};

const fundProjects = async (amount, message) => {
  const paymentUrl = await payment.createPayment(amount, message, PaypalAccessToken);
  return paymentUrl;
};

const refundPayment = async (projectid, paymentemail, isAmount) => {
  let amount = isAmount ? isAmount * 0.95 : 0;
  const account = await Payment.findOne({ projectid, paymentemail });
  if (!isAmount) {
    amount = account.amount;
  }

  await payment.initiatePayout(amount, account.paymentemail, PaypalAccessToken);
  if (account) {
    await Payment.findOneAndDelete({ projectid, paymentemail });
  }
  if (isAmount) {
    await Project.findOneAndUpdate({ _id: projectid }, { completed: true });
  }
  return 'Successfully sent the payment';
};

const paymentFailureHandler = () => 'http://localhost:5173/payment/failed';

const paymentSucessHandler = async (paymentId, projectid, payerid, amount, message) => {
  const paymentDetailsPromise = payment.getPaymentDetails(paymentId, PaypalAccessToken);
  const paymentDetails = await paymentDetailsPromise;
  const paymentStatus = await payment.executePayment(
    paymentId,
    paymentDetails.payer.payer_info.payer_id,
    PaypalAccessToken,
  );
  if (paymentStatus === 'approved') {
    await saveBackedProjects(projectid, payerid);
    const PaymentsDetails = new Payment({
      projectid,
      payerid,
      amount,
      message,
      paymentemail: paymentDetails.payer.payer_info.email,
    });
    await PaymentsDetails.save();
    await Project.findOneAndUpdate({ _id: projectid }, { $inc: { amountReached: amount } });
    return 'http://localhost:5173/payment/success';
  }
  return 'something went wrong your account not charged';
};

module.exports = { fundProjects, refundPayment, paymentFailureHandler, paymentSucessHandler };
