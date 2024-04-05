const jwt = require('jsonwebtoken');
const { SecretToken } = require('../config/env.config');

const generateToken = (user) => {
  try {
    const accessToken = jwt.sign({ user }, SecretToken, { expiresIn: '1d' });
    return accessToken;
  } catch (error) {
    throw new Error('Error generating token');
  }
};

module.exports = generateToken;
