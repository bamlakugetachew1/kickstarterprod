const router = require('express').Router();
const validateFavourits = require('../../validate/validate.favourites');
const favouritecontroller = require('../../controllers/favourite.controller');
const verifyToken = require('../../middlewares/verify.token');

router.post('/addtofavourites', verifyToken.verifyToken, validateFavourits, favouritecontroller.addToFavourites);

module.exports = router;
