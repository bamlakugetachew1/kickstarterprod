const bcrypt = require('bcrypt');
const catchAsync = require('./catchAsync');

const hashPassword = catchAsync(async (password) => {
  const salt = await bcrypt.genSalt(10);
  const result = await bcrypt.hash(password, salt);
  return result;
});

module.exports = hashPassword;
