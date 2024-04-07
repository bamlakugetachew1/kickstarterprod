const router = require('express').Router();
const validateFollower = require('../validate/validateFollower');
const followercontroller = require('../controllers/followercontroller');

router.route('/follow').post(validateFollower, followercontroller.followcreators);

module.exports = router;
