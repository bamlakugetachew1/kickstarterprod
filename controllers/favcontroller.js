const FavouriteProject = require('../models/favourites.model');
const catchAsync = require('../utils/catchAsync');

exports.addtofavourites = catchAsync(async (req, res) => {
  const { projectid, creatorid } = req.body;
  const alreadyAdded = await FavouriteProject.findOne({ projectid, creatorid });
  if (!alreadyAdded) {
    const newFavourites = new FavouriteProject({ projectid, creatorid });
    await newFavourites.save();
    return res.status(200).json({ message: 'Successfully added to favourites' });
  }
  await FavouriteProject.findOneAndDelete({ projectid, creatorid });
  return res.status(200).json({ message: 'Successfully removed from favourites' });
});
