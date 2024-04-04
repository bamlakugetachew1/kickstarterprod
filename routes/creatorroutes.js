const router = require('express').Router();
const validateCreator = require('../validate/validateCreators');
const creatorcontroller = require('../controllers/creatorcontroller');

router.route('/creator').post(validateCreator, creatorcontroller.createcreators);

module.exports = router;
