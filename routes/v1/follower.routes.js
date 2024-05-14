const router = require('express').Router();
const validateFollower = require('../../validate/validate.follower');
const followercontroller = require('../../controllers/follower.controller');
const verifyToken = require('../../middlewares/verify.token');

/**
 * @swagger
 * /api/v1/follower/follow:
 *   post:
 *     summary: Follow or Unfollow Creator
 *     description: Follow or unfollow a creator.
 *     tags:
 *       - Followers
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               followerid:
 *                 type: string
 *                 description: The ID of the follower.
 *               followedid:
 *                 type: string
 *                 description: The ID of the creator being followed.
 *     responses:
 *       '200':
 *         description: OK.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   description: Message indicating success or failure.
 *       '400':
 *         description: Bad Request. Missing or invalid ids.
 *       '401':
 *         description: Unauthorized. Invalid token.
 *       '500':
 *         description: Internal Server Error. An error occurred while processing the request.
 */

router.post('/follow', verifyToken.verifyToken, validateFollower, followercontroller.followCreator);

module.exports = router;
