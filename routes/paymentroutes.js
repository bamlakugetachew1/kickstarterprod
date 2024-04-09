const router = require('express').Router();
const validatePayment = require('../validate/validatePayment');
const paymentcontroller = require('../controllers/paymentcontroller');
const verifyToken = require('../utils/verifyToken');

router.post('/pay', verifyToken.verifyToken, validatePayment, paymentcontroller.fundProjects);

module.exports = router;
