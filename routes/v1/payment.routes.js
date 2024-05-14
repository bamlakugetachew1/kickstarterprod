const router = require('express').Router();
const validatePayment = require('../../validate/validate.payment');
const paymentcontroller = require('../../controllers/payment.controller');
const verifyToken = require('../../middlewares/verify.token');

router.get('/pay/success', paymentcontroller.paymentSucessHandler);
router.get('/pay/cancel', paymentcontroller.paymentFailureHandler);
router.use(verifyToken.verifyToken);
/**
 * @swagger
 * /api/v1/payment/pay:
 *   post:
 *     summary: Fund Project
 *     description: Create a payment to fund a project.
 *     tags:
 *       - Payments
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               projectid:
 *                 type: string
 *                 description: The ID of the project being funded.
 *               payerid:
 *                 type: string
 *                 description: The ID of the payer.
 *               amount:
 *                 type: number
 *                 description: The amount of money to fund the project.
 *               message:
 *                 type: string
 *                 description: Optional message to include with the payment.
 *     responses:
 *       '200':
 *         description: OK.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   description: URL to the payment gateway to complete the payment.
 *       '400':
 *         description: Bad Request. Missing or invalid ids.
 *       '401':
 *         description: Unauthorized. Invalid token.
 *       '500':
 *         description: Internal Server Error.
 *       '503':
 *         description: Service  Unavailable.
 */

router.post('/pay', validatePayment, paymentcontroller.fundProjects);

/**
 * @swagger
 * /api/v1/payment/pay/refund:
 *   post:
 *     summary: Refund Payment
 *     description: Refund a payment made for a project.
 *     tags:
 *       - Payments
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               projectid:
 *                 type: string
 *                 description: The ID of the project associated with the payment.
 *               paymentemail:
 *                 type: string
 *                 description: The email associated with the payment.
 *               isAmount:
 *                 type: number
 *                 description: The amount to be refunded.
 *     responses:
 *       '200':
 *         description: OK.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   description: Message indicating success.
 *       '400':
 *         description: Bad Request. Missing or invalid ids.
 *       '401':
 *         description: Unauthorized. Invalid token.
 *       '404':
 *         description: No asscociated account found.
 *       '500':
 *         description: Internal Server Error. An error occurred while processing the request.
 *       '503':
 *         description: Service  Unavailable.
 */

router.post('/pay/refund', paymentcontroller.refundPayment);

module.exports = router;
