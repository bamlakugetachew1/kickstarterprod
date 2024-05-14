/* eslint-disable max-len */
const router = require('express').Router();
const { validateCreator, validateUpdatedCreator } = require('../../validate/validate.creators');
const creatorcontroller = require('../../controllers/creator.controller');
const verifyToken = require('../../middlewares/verify.token');
/**
 * @swagger
 * /api/v1/creator:
 *   post:
 *     summary: Create a new creator
 *     description: Endpoint to create a new creator.
 *     tags:
 *       - Creators
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               about:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               interest:
 *                 type: array
 *                 items:
 *                   type: string
 *             required:
 *               - username
 *               - about
 *               - email
 *               - password
 *               - interest
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Bad Request.
 *       '409':
 *         description: Conflict. This email is already registered.
 *       '500':
 *         description: Server Error.
 *
 *   get:
 *     summary: Get details of an individual creator
 *     description: Endpoint to retrieve details of an individual creator.
 *     tags:
 *       - Creators
 *     parameters:
 *       - in: query
 *         name: creatorid
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the creator to retrieve details for.
 *     responses:
 *       '200':
 *         description: Creator details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique ID of the creator
 *                 username:
 *                   type: string
 *                   description: The username of the creator
 *                 about:
 *                   type: string
 *                   description: About section of the creator
 *                 interest:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: List of interests of the creator
 *       '400':
 *         description: Bad Request.
 *       '404':
 *         description: Creator not found.
 *       '500':
 *         description: Server Error.
 */

router
  .route('')
  .post(validateCreator, creatorcontroller.createCreators)
  .get(creatorcontroller.individualCreatorsDetails);
/**
 * @swagger
 * /api/v1/creator/login:
 *   post:
 *     summary: Login to the system
 *     description: Endpoint to authenticate and login a user.
 *     tags:
 *       - Creators
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       '200':
 *         description: Success. You are now logged in.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: Success. You are now logged in.
 *                 userid:
 *                   type: string
 *                   description: ID of the logged-in user
 *                   example: 60c35a7f1fda0532bc571da4
 *                 email:
 *                   type: string
 *                   description: Email of the logged-in user
 *                   example: user@example.com
 *                 username:
 *                   type: string
 *                   description: Username of the logged-in user
 *                   example: user123
 *                 accessToken:
 *                   type: string
 *                   description: Access token for authentication
 *       '400':
 *         description: Bad Request.
 *       '401':
 *         description: Unauthorized - Incorrect password
 *       '404':
 *         description: Not Found - Email not found in our system
 */
router.post('/login', creatorcontroller.loginCreator);
/**
 * @swagger
 * /api/v1/creator/favourites:
 *   get:
 *     summary: Get favorite projects for a creator
 *     description: Retrieves favorite projects associated with a given creator ID.
 *     tags:
 *       - Creators
 *     parameters:
 *       - in: query
 *         name: creatorid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the creator whose favorite projects are to be retrieved
 *     responses:
 *       '200':
 *         description: A list of favorite projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID of the favorite record
 *                   projectid:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: ID of the project
 *                       title:
 *                         type: string
 *                         description: Title of the project
 *                       descreptons:
 *                         type: string
 *                         description: Description of the project
 *                       catagory:
 *                         type: array
 *                         items:
 *                           type: string
 *                         description: Categories of the project
 *                       goal:
 *                         type: number
 *                         description: Funding goal of the project
 *                       imagesLink:
 *                         type: array
 *                         items:
 *                           type: string
 *                         description: Links to images associated with the project
 *                       creator:
 *                         type: object
 *                         properties:
 *                           username:
 *                             type: string
 *                             description: Username of the creator
 *                           userid:
 *                             type: string
 *                             description: ID of the creator
 *                       amountReached:
 *                         type: number
 *                         description: Amount reached by the project
 *                       deadline:
 *                         type: string
 *                         format: date-time
 *                         description: Deadline of the project
 *                       percentfunded:
 *                         type: number
 *                         description: Percentage of funding reached for the project
 *                       daysLeft:
 *                         type: number
 *                         description: Number of days left until project deadline
 *                       id:
 *                         type: string
 *                         description: ID of the project
 *                   id:
 *                     type: string
 *                     description: ID of the favorite record
 *       '400':
 *         description:
 *           Bad request. Creator ID is either invalid or missing.
 *       '404':
 *         description: Not found. No favorites added by the creator.
 */

router.get('/favourites', creatorcontroller.getFavourites);

/**
 * @swagger
 * /api/v1/creator/backedprojects:
 *   get:
 *     summary: Get backed projects for a creator
 *     description: Retrieves projects backed by a given creator ID.
 *     tags:
 *       - Creators
 *     parameters:
 *       - in: query
 *         name: creatorid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the creator whose backed projects are to be retrieved
 *     responses:
 *       '200':
 *         description: A list of backed projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID of the backed project record
 *                   projectid:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: ID of the project
 *                       title:
 *                         type: string
 *                         description: Title of the project
 *                       descreptons:
 *                         type: string
 *                         description: Description of the project
 *                       catagory:
 *                         type: array
 *                         items:
 *                           type: string
 *                         description: Categories of the project
 *                       goal:
 *                         type: number
 *                         description: Funding goal of the project
 *                       imagesLink:
 *                         type: array
 *                         items:
 *                           type: string
 *                         description: Links to images associated with the project
 *                       creator:
 *                         type: object
 *                         properties:
 *                           username:
 *                             type: string
 *                             description: Username of the creator
 *                           userid:
 *                             type: string
 *                             description: ID of the creator
 *                       amountReached:
 *                         type: number
 *                         description: Amount reached by the project
 *                       deadline:
 *                         type: string
 *                         format: date-time
 *                         description: Deadline of the project
 *                       percentfunded:
 *                         type: number
 *                         description: Percentage of funding reached for the project
 *                       daysLeft:
 *                         type: number
 *                         description: Number of days left until project deadline
 *                       id:
 *                         type: string
 *                         description: ID of the project
 *                   id:
 *                     type: string
 *                     description: ID of the backed project record
 *       '400':
 *         description: |
 *           Bad request. Creator ID is either invalid or missing.
 *       '404':
 *         description: Not found. No backed projects found for the specified creator ID.
 */

router.get('/backedprojects', creatorcontroller.getBackedProjects);

/**
 * @swagger
 * /api/v1/creator/createdprojects:
 *   get:
 *     summary: Get projects created by a creator
 *     description: Retrieves projects created by a given creator ID.
 *     tags:
 *       - Creators
 *     parameters:
 *       - in: query
 *         name: creatorid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the creator whose created projects are to be retrieved
 *     responses:
 *       '200':
 *         description: A list of projects created by the creator
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID of the created project record
 *                   title:
 *                     type: string
 *                     description: Title of the project
 *                   description:
 *                     type: string
 *                     description: Description of the project
 *                   category:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: Categories of the project
 *                   goal:
 *                     type: number
 *                     description: Funding goal of the project
 *                   imagesLink:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: Links to images associated with the project
 *                   creator:
 *                     type: object
 *                     properties:
 *                       username:
 *                         type: string
 *                         description: Username of the creator
 *                       userid:
 *                         type: string
 *                         description: ID of the creator
 *                   amountReached:
 *                     type: number
 *                     description: Amount reached by the project
 *                   deadline:
 *                     type: string
 *                     format: date-time
 *                     description: Deadline of the project
 *                   percentFunded:
 *                     type: number
 *                     description: Percentage of funding reached for the project
 *                   daysLeft:
 *                     type: number
 *                     description: Number of days left until project deadline
 *                   id:
 *                     type: string
 *                     description: ID of the project
 *       '400':
 *         description: |
 *           Bad request. Creator ID is either invalid or missing.
 *       '404':
 *         description: Not found. No projects found for the specified creator ID.
 */

router.get('/createdprojects', creatorcontroller.getMyListedProjects);
router.use(verifyToken.verifyToken);

/**
 * @swagger
 * /api/v1/creator/updateaccount:
 *   patch:
 *     summary: Update account details
 *     description: Update the account details of the currently authenticated creator.
 *     tags:
 *       - Creators
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: New username for the creator's account
 *               about:
 *                 type: string
 *                 description: New about section for the creator's account
 *               password:
 *                 type: string
 *                 description: New password for the creator's account
 *     responses:
 *       '200':
 *         description: Account details updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   description: Success message
 *                   example: Account details updated successfully.
 *       '401':
 *         description: Unauthorized. Invalid token.
 *       '404':
 *         description: Not Found.
 *       '500':
 *         description: Internal Server Error.
 */

router.patch('/updateaccount', validateUpdatedCreator, creatorcontroller.updateAccountDetails);
/**
 * @swagger
 * /api/v1/creator/visibility:
 *   patch:
 *     summary: Toggle visibility of user profile
 *     description: Toggle the visibility of the authenticated user's profile between public and private.
 *     tags:
 *       - Creators
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *     responses:
 *       '200':
 *         description: Profile visibility toggled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   description: your profile made public or private
 *                   example: your profile made public or private
 *       '401':
 *         description: Unauthorized. Invalid token.
 *       '404':
 *         description: No user found.
 *       '500':
 *         description: Internal Server Error.
 */

router.patch('/visibility', creatorcontroller.toggleVisibility);

module.exports = router;
