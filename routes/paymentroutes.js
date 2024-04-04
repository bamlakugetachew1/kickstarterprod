const router = require('express').Router();
const validatePayment = require('../validate/validatePayment');
const paymentcontroller = require('../controllers/paymentcontroller');

router.route('/pay').post(validatePayment, paymentcontroller.fundProjects);

module.exports = router;
