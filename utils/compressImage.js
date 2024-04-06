const sharp = require('sharp');
const path = require('path');
const catchAsync = require('./catchAsync');

const compressImage = catchAsync(async (filenames) => {
  const compressedFilenames = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const filename of filenames) {
    const inputPath = path.join('images', filename);
    const outputPath = path.join('compressedimages', filename);
    // eslint-disable-next-line no-await-in-loop
    await sharp(inputPath).resize(600).toFile(outputPath);

    compressedFilenames.push(outputPath);
  }

  return compressedFilenames;
});

module.exports = compressImage;
