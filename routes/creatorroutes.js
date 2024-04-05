const router = require('express').Router();
const validateCreator = require('../validate/validateCreators');
const creatorcontroller = require('../controllers/creatorcontroller');

router.route('/creator').post(validateCreator, creatorcontroller.createcreators);
router.route('/creator/login').post(creatorcontroller.loginCreator);

module.exports = router;
