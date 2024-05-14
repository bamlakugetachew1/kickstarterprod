const router = require('express').Router();
const validateFavourits = require('../../validate/validate.favourites');
const favouritecontroller = require('../../controllers/favourite.controller');
const verifyToken = require('../../middlewares/verify.token');

/**
 * @swagger
 * /api/v1/favourites/addtofavourites:
 *   post:
 *     summary: Add or Remove from Favourites
 *     description: Add or remove a project from user's favourites list.
 *     tags:
 *       - Favourites
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               projectid:
 *                 type: string
 *                 description: The ID of the project.
 *               creatorid:
 *                 type: string
 *                 description: The ID of the project creator.
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

router.post('/addtofavourites', verifyToken.verifyToken, validateFavourits, favouritecontroller.addToFavourites);

module.exports = router;
