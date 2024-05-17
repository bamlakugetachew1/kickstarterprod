const bcrypt = require('bcrypt');
const catchAsync = require('./catchAsync');

const compareHashes = catchAsync(async (receivedPassword, savedPassword) => {
  const result = await bcrypt.compare(receivedPassword, savedPassword);
  if (!result) {
    throw new Error('Hashes do not match');
  }
  return result;
});

module.exports = compareHashes;
