const router = require('express').Router();
const validateFollower = require('../../validate/validate.follower');
const followercontroller = require('../../controllers/follower.controller');
const verifyToken = require('../../middlewares/verify.token');

router.post('/follow', verifyToken.verifyToken, validateFollower, followercontroller.followCreator);

module.exports = router;
