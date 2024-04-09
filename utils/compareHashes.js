const bcrypt = require('bcrypt');

const compareHashes = async (recivedpassword, savedpassword) => {
  try {
    const result = await bcrypt.compare(recivedpassword, savedpassword);
    return result;
  } catch (error) {
    throw new Error('Hashes not matches');
  }
};

module.exports = compareHashes;
