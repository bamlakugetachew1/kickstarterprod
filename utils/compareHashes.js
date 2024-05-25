const bcrypt = require('bcrypt');

const compareHashes = async (receivedPassword, savedPassword) => {
  try {
    const result = await bcrypt.compare(receivedPassword, savedPassword);
    if (!result) {
      throw new Error('Hashes do not match');
    }
    return result;
  } catch (error) {
    throw new Error('Error comparing hashes');
  }
};

module.exports = compareHashes;
