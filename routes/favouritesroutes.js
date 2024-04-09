const router = require('express').Router();
const validateFavourits = require('../validate/validate.favourites');
const favouritecontroller = require('../controllers/favcontroller');
const verifyToken = require('../utils/verifyToken');

router.post('/addtofavourites', verifyToken.verifyToken, validateFavourits, favouritecontroller.addtofavourites);

module.exports = router;
