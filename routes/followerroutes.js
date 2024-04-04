const router = require('express').Router();
const validateFollower = require('../validate/validateFollower');
const followercontroller = require('../controllers/followercontroller');

router.route('/follower').post(validateFollower, followercontroller.followcreators);

module.exports = router;
