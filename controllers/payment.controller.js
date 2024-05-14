/* eslint-disable max-len */
const httpStatus = require('http-status');
const { paymentService } = require('../services');
const { catchAsync, handleServiceRequest } = require('../utils');

exports.fundProjects = catchAsync(async (req, res) => {
  const { projectid, payerid, amount, message } = req.body;
  req.session.paymentData = { projectid, payerid, amount, message };
  handleServiceRequest(res, paymentService.fundProjects, httpStatus.OK, amount, message, projectid, payerid);
});

exports.refundPayment = catchAsync(async (req, res) => {
  const { projectid, paymentemail, isAmount } = req.body;
  handleServiceRequest(res, paymentService.refundPayment, httpStatus.OK, projectid, paymentemail, isAmount);
});

exports.paymentFailureHandler = catchAsync(async (req, res) => {
  req.session.destroy();
  handleServiceRequest(res, paymentService.paymentFailureHandler, httpStatus.TEMPORARY_REDIRECT);
});

exports.paymentSucessHandler = catchAsync(async (req, res) => {
  const { projectid, payerid, amount, message } = req.session.paymentData;
  const { paymentId } = req.query;
  handleServiceRequest(
    res,
    paymentService.paymentSucessHandler,
    httpStatus.TEMPORARY_REDIRECT,
    paymentId,
    projectid,
    payerid,
    amount,
    message,
  );
});
