const jwt = require('jsonwebtoken');

// eslint-disable-next-line consistent-return
exports.verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // eslint-disable-next-line consistent-return
    jwt.verify(token, process.env.SecretToken, (err, user) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
