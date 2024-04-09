const router = require('express').Router();
const validateFollower = require('../validate/validateFollower');
const followercontroller = require('../controllers/followercontroller');
const verifyToken = require('../utils/verifyToken');

router.post('/follow', verifyToken.verifyToken, validateFollower, followercontroller.followcreators);

module.exports = router;
