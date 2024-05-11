/* eslint-disable no-useless-catch */
/* eslint-disable consistent-return */
const axios = require('axios');
const logger = require('../logger/logger');

const createPayment = async (amount, description, accessToken) => {
  try {
    const paymentData = {
      intent: 'SALE',
      payer: {
        payment_method: 'paypal',
      },
      transactions: [
        {
          amount: {
            total: amount,
            currency: 'USD',
          },
          description,
        },
      ],
      redirect_urls: {
        return_url: 'http://localhost:3000/api/v1/payment/pay/success',
        cancel_url: 'http://localhost:3000/api/v1/payment/pay/cancel',
      },
    };
    const response = await axios.post('https://api.sandbox.paypal.com/v1/payments/payment', paymentData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    const paymentUrl = response.data.links.find((link) => link.rel === 'approval_url').href;
    return paymentUrl;
  } catch (error) {
    logger.error(error);
  }
};

async function getPaymentDetails(paymentId, accessToken) {
  try {
    const response = await axios.get(`https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    logger.error(error);
  }
}

async function executePayment(paymentId, payerId, accessToken) {
  try {
    const response = await axios.post(
      `https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`,
      { payer_id: payerId },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );
    const paymentStatus = response.data.state;
    return paymentStatus;
  } catch (error) {
    logger.error(error);
  }
}
async function initiatePayout(amount, recipientPayPalEmail, accessToken) {
  try {
    const requestBody = {
      sender_batch_header: {
        recipient_type: 'EMAIL',
        email_message: 'Thank you for your donation!',
        note: 'Thank you for your support!',
        sender_batch_id: `batch_${Math.random().toString(36).substring(9)}`,
      },
      items: [
        {
          recipient_type: 'EMAIL',
          amount: {
            value: amount,
            currency: 'USD',
          },
          receiver: recipientPayPalEmail,
          note: 'Thank you for your donation!',
        },
      ],
    };

    const response = await axios.post('https://api.sandbox.paypal.com/v1/payments/payouts', requestBody, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

module.exports = { createPayment, getPaymentDetails, executePayment, initiatePayout };
