const router = require('express').Router();
const validatePayment = require('../../validate/validate.payment');
const paymentcontroller = require('../../controllers/payment.controller');
const verifyToken = require('../../middlewares/verify.token');

router.post('/pay', verifyToken.verifyToken, validatePayment, paymentcontroller.fundProjects);

module.exports = router;
