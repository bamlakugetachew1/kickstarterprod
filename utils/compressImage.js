const sharp = require('sharp');
const catchAsync = require('./catchAsync');

const compressImage = catchAsync(async (filePaths) => {
  const compressedfilePaths = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const filePath of filePaths) {
    // eslint-disable-next-line no-await-in-loop
    await sharp(filePath).resize(600).toFile(filePath);
    compressedfilePaths.push(filePath);
  }

  return compressedfilePaths;
});

module.exports = compressImage;
