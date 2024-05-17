/* eslint-disable max-len */
const router = require('express').Router();
const { validateProject, validateUpdatedProject } = require('../../validate/validate.project');
const projectcontroller = require('../../controllers/project.controller');
const { uploadMiddleware } = require('../../utils');
const verifyToken = require('../../middlewares/verify.token');
/**
 * @swagger
 * /api/v1/projects/recomended:
 *   get:
 *     summary: Get Recommended Projects
 *     description: Retrieve a list of recommended projects.
 *     tags:
 *       - Projects
 *     responses:
 *       '200':
 *         description: OK. Recommended projects retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique identifier for the project.
 *                   title:
 *                     type: string
 *                     description: The title of the project.
 *                   description:
 *                     type: string
 *                     description: A brief description of the project.
 *                   category:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: Categories associated with the project.
 *                   goal:
 *                     type: number
 *                     description: The funding goal of the project.
 *                   imagesLink:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: Links to images related to the project.
 *                   creator:
 *                     type: object
 *                     properties:
 *                       username:
 *                         type: string
 *                         description: The username of the project creator.
 *                       userid:
 *                         type: string
 *                         description: The user ID of the project creator.
 *                   amountReached:
 *                     type: number
 *                     description: The amount of funding reached for the project.
 *                   percentFunded:
 *                     type: number
 *                     description: The percentage of funding reached for the project.
 *                   daysLeft:
 *                     type: number
 *                     description: The number of days left for the project's campaign.
 *                   __v:
 *                     type: number
 *                     description: Version control for the project document.
 *       '404':
 *         description: Not Found. No recommended projects found.
 *       '500':
 *         description: Internal Server Error.
 */

router.get('/recomended', projectcontroller.getRecomendedProject);

/**
 * @swagger
 * /api/v1/projects/stats:
 *   get:
 *     summary: Get Overall Platform Status
 *     description: Retrieve overall status of the platform.
 *     tags:
 *       - Projects
 *     responses:
 *       '200':
 *         description: OK.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 numberofdonations:
 *                   type: integer
 *                   description: The total number of donations made on the platform.
 *                 numberofprojects:
 *                   type: integer
 *                   description: The total number of projects on the platform.
 *                 pledges:
 *                   type: integer
 *                   description: The total number of pledges made on the platform.
 *       '500':
 *         description: Internal Server Error.
 */

router.get('/stats', projectcontroller.getOverallPlatformStatus);

/**
 * @swagger
 * /api/v1/projects/single:
 *   get:
 *     summary: Get Single Project
 *     description: Retrieve details of a single project by its ID.
 *     tags:
 *       - Projects
 *     parameters:
 *       - in: query
 *         name: projectid
 *         required: true
 *         description: ID of the project to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier for the project.
 *                 title:
 *                   type: string
 *                   description: The title of the project.
 *                 description:
 *                   type: string
 *                   description: A brief description of the project.
 *                 category:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Categories associated with the project.
 *                 goal:
 *                   type: number
 *                   description: The funding goal of the project.
 *                 reward:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Rewards offered for supporting the project.
 *                 updates:
 *                   type: array
 *                   items: {}
 *                   description: Updates related to the project (empty array in this response).
 *                 imagesLink:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Links to images related to the project.
 *                 videoLink:
 *                   type: string
 *                   description: Link to a video related to the project.
 *                 creator:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                       description: The username of the project creator.
 *                     userid:
 *                       type: string
 *                       description: The user ID of the project creator.
 *                 amountReached:
 *                   type: number
 *                   description: The amount of funding reached for the project.
 *                 deadline:
 *                   type: string
 *                   format: date-time
 *                   description: The deadline for the project.
 *                 __v:
 *                   type: number
 *                   description: Version control for the project document.
 *                 percentFunded:
 *                   type: number
 *                   description: The percentage of funding reached for the project.
 *                 daysLeft:
 *                   type: number
 *                   description: The number of days left for the project's campaign.
 *                 id:
 *                   type: string
 *                   description: The same as _id for backward compatibility.
 *       '400':
 *         description: Bad Request. missing or invalid project id.
 *       '404':
 *         description: Not Found. No project found with the provided ID.
 *       '500':
 *         description: Internal Server Error. An error occurred while retrieving project details.
 */

router.get('/single', projectcontroller.getSingleProject);

/**
 * @swagger
 * /api/v1/projects/search:
 *   get:
 *     summary: Search Projects
 *     description: Retrieve projects matching the provided search query.
 *     tags:
 *       - Projects
 *     parameters:
 *       - in: query
 *         name: searchquery
 *         required: true
 *         description: The search query to find matching projects.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *       '400':
 *         description: Bad Request. Search query is a required field.
 *       '404':
 *         description: Not Found. No results found for the provided search query.
 *       '500':
 *         description: Internal Server Error. An error occurred while searching for projects.
 *
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the project.
 *         title:
 *           type: string
 *           description: The title of the project.
 *         description:
 *           type: string
 *           description: A brief description of the project.
 *         category:
 *           type: array
 *           items:
 *             type: string
 *           description: Categories associated with the project.
 *         goal:
 *           type: number
 *           description: The funding goal of the project.
 *         reward:
 *           type: array
 *           items:
 *             type: string
 *           description: Rewards offered for supporting the project.
 *         updates:
 *           type: array
 *           items: {}
 *           description: Updates related to the project.
 *         imagesLink:
 *           type: array
 *           items:
 *             type: string
 *           description: Links to images related to the project.
 *         videoLink:
 *           type: string
 *           description: Link to a video related to the project.
 *         creator:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *               description: The username of the project creator.
 *             userid:
 *               type: string
 *               description: The user ID of the project creator.
 *         amountReached:
 *           type: number
 *           description: The amount of funding reached for the project.
 *         deadline:
 *           type: string
 *           format: date-time
 *           description: The deadline for the project.
 *         __v:
 *           type: number
 *           description: Version control for the project document.
 *         percentfunded:
 *           type: number
 *           description: The percentage of funding reached for the project.
 *         daysLeft:
 *           type: number
 *           description: The number of days left for the project's campaign.
 *         id:
 *           type: string
 *           description: The same as _id for backward compatibility.
 */

router.get('/search', projectcontroller.searchProjects);

/**
 * @swagger
 * /api/v1/projects/singleprojectmetrics:
 *   get:
 *     summary: Get Single Project Status
 *     description: Retrieve the status of a single project.
 *     tags:
 *       - Projects
 *     parameters:
 *       - in: query
 *         name: projectid
 *         required: true
 *         description: ID of the project to retrieve status for.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK. Single project status retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: null
 *                     description: The unique identifier for the project.
 *                   donors:
 *                     type: integer
 *                     description: The number of donors for the project.
 *                   averageDonationAmount:
 *                     type: integer
 *                     description: The average donation amount for the project.
 *                   totalFunds:
 *                     type: integer
 *                     description: The total funds raised for the project.
 *       '400':
 *         description: Bad Request. missing or invalid project id.
 *       '500':
 *         description: Internal Server Error.
 */

router.get('/singleprojectmetrics', projectcontroller.getSingleProjectStatus);

/**
 * @swagger
 * /api/v1/projects/recentfivebackers:
 *   get:
 *     summary: Get Recent Backers for a Project
 *     description: Retrieve recent backers for a project by its ID.
 *     tags:
 *       - Projects
 *     parameters:
 *       - in: query
 *         name: projectid
 *         required: true
 *         description: ID of the project to retrieve recent backers for.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RecentBacker'
 *       '400':
 *         description: Bad Request. missing or invalid project id.
 *       '404':
 *         description: Not Found. No backers found for the provided project ID.
 *       '500':
 *         description: Internal Server Error.
 *
 * components:
 *   schemas:
 *     RecentBacker:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the recent backer.
 *         payerid:
 *           $ref: '#/components/schemas/User'
 *
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the user.
 *         username:
 *           type: string
 *           description: The username of the backer.
 *         about:
 *           type: string
 *           description: Information about the backer.
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the backer.
 *         interest:
 *           type: array
 *           items:
 *             type: string
 *           description: Interests of the backer.
 *         visibility:
 *           type: string
 *           description: The visibility setting of the backer's profile.
 *         __v:
 *           type: number
 *           description: Version control for the user document.
 *         id:
 *           type: string
 *           description: The same as _id for backward compatibility.
 */

router.get('/recentfivebackers', projectcontroller.getRecentFiveBackers);

/**
 * @swagger
 * /api/v1/projects/readimage:
 *   get:
 *     summary: Stream Image
 *     description: Stream an image file to the client.
 *     tags:
 *       - Projects
 *     parameters:
 *       - in: query
 *         name: filename
 *         required: true
 *         description: The name of the image file to stream.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           image/*:
 *             schema:
 *               type: string
 *               format: binary
 *       '400':
 *         description: Bad Request. Filename is missing.
 *       '404':
 *         description: File not found.
 *       '500':
 *         description: Internal Server Error. An error occurred while streaming the image.
 */
router.get('/readimage', projectcontroller.streamImage);

/**
 * @swagger
 * /api/v1/projects/readvideo:
 *   get:
 *     summary: Stream Video
 *     description: Stream a video file to the client.
 *     tags:
 *       - Projects
 *     parameters:
 *       - in: query
 *         name: filename
 *         required: true
 *         description: The name of the video file to stream.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK.
 *         content:
 *           video/*:
 *             schema:
 *               type: string
 *               format: binary
 *       '400':
 *         description: Bad Request. Filename is missing.
 *       '404':
 *         description: File not found.
 *       '500':
 *         description: Internal Server Error. An error occurred while streaming the video.
 */

router.get('/readvideo', projectcontroller.streamVideo);

/**
 * @swagger
 * /api/v1/projects:
 *   post:
 *     summary: Create a new project
 *     description: Create a new project and its associated data.
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the project
 *               descreptons:
 *                 type: string
 *                 description: Description of the project
 *               category:
 *                 type: array
 *                 description: Categories of the project
 *                 items:
 *                   type: string
 *               goal:
 *                 type: number
 *                 description: Funding goal of the project
 *               reward:
 *                 type: array
 *                 description: Rewards offered for funding the project
 *                 items:
 *                   type: string
 *               imagesLink:
 *                 type: array
 *                 description: Links to images related to the project
 *                 items:
 *                   type: string
 *               videoLink:
 *                 type: string
 *                 description: Link to a video related to the project (optional)
 *               creator:
 *                 type: object
 *                 description: Information about the creator of the project
 *                 properties:
 *                   username:
 *                     type: string
 *                     description: Username of the creator
 *                   userid:
 *                     type: string
 *                     description: ID of the creator
 *               deadline:
 *                 type: string
 *                 format: date
 *                 description: Deadline for the project
 *     responses:
 *       '201':
 *         description: Project added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   description: Success message
 *                   example: Project added successfully.
 *       '400':
 *         description: Bad Request. Invalid input data.
 *       '401':
 *         description: Unauthorized. Invalid token.
 *       '500':
 *         description: Failed to create project or associated project.
 *   get:
 *     summary: Get all projects
 *     description: Retrieve all projects.
 *     tags:
 *       - Projects
 *     responses:
 *       '200':
 *         description: Retrieve all projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   category:
 *                     type: array
 *                     items:
 *                       type: string
 *                   goal:
 *                     type: number
 *                   imagesLink:
 *                     type: array
 *                     items:
 *                       type: string
 *                   creator:
 *                     type: object
 *                     properties:
 *                       username:
 *                         type: string
 *                       userid:
 *                         type: string
 *                   deadline:
 *                     type: string
 *                     format: date-time
 *                   amountReached:
 *                     type: number
 *                   percentfunded:
 *                     type: number
 *                   daysLeft:
 *                     type: number
 *                   id:
 *                     type: string
 *       '404':
 *         description: No projects found
 */

router
  .route('')
  .post(verifyToken.verifyToken, validateProject, projectcontroller.createProject)
  .get(projectcontroller.getAllProject);
router.use(verifyToken.verifyToken);
/**
 * @swagger
 * /api/v1/projects/deleteproject/{projectid}:
 *   delete:
 *     summary: Delete Project
 *     description: Delete a project by its ID.
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectid
 *         required: true
 *         description: ID of the project to delete.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK. Project deleted successfully.
 *       '400':
 *         description: Bad Request. missing or invalid project id.
 *       '401':
 *         description: Unauthorized. Invalid token.
 *       '404':
 *         description: Not Found. Project not found.
 *       '500':
 *         description: Internal Server Error. An error occurred while deleting the project.
 */

router.delete('/deleteproject/:projectid', projectcontroller.deleteProject);

/**
 * @swagger
 * /api/v1/projects/updateproject:
 *   patch:
 *     summary: Update Project
 *     description: Update a project with new data.
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectUpdateData'
 *     responses:
 *       '200':
 *         description: OK. Project updated successfully.
 *       '400':
 *         description: Bad Request. Project data is missing or invalid.
 *       '401':
 *         description: Unauthorized. Invalid token.
 *       '404':
 *         description: Not Found. Project not found.
 *       '500':
 *         description: Internal Server Error. An error occurred while updating the project.
 *
 * components:
 *   schemas:
 *     ProjectUpdateData:
 *       type: object
 *       properties:
 *         projectid:
 *           type: string
 *           description: The ID of the project to be updated.
 *         title:
 *           type: string
 *           description: The title of the project.
 *         descreptons:
 *           type: string
 *           description: A brief description of the project.
 *         catagory:
 *           type: array
 *           items:
 *             type: string
 *           description: Categories associated with the project.
 *         reward:
 *           type: array
 *           items:
 *             type: string
 *           description: Rewards offered for supporting the project.
 *         updates:
 *           type: array
 *           items: {}
 *           description: Updates related to the project.
 */

router.patch('/updateproject', validateUpdatedProject, projectcontroller.updateProject);

/**
 * @swagger
 * /api/v1/projects/uploadimages:
 *   post:
 *     summary: Upload Images
 *     description: Upload image files.
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               coverimage:
 *                 type: array
 *                 items:
 *                   type: file
 *                   format: binary
 *                 description: Array of image files to upload(upto 4 image files will be processed).
 *     responses:
 *       '200':
 *         description: OK.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 description: Filenames of the uploaded images.
 *       '400':
 *         description: Bad Request. No file uploaded.
 *       '401':
 *         description: Unauthorized. Invalid token.
 *       '500':
 *         description: Internal Server Error. An error occurred while processing the images.
 */
router.post('/uploadimages', uploadMiddleware('coverimage'), projectcontroller.uploadImage);

/**
 * @swagger
 * /api/v1/projects/uploadvideo:
 *   post:
 *     summary: Upload Video
 *     description: Upload a video file.
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               video:
 *                 type: array
 *                 items:
 *                   type: file
 *                   format: binary
 *                 description: Array of video files to upload(only 1 file will be processed).
 *     responses:
 *       '200':
 *         description: OK. Video uploaded successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 description: Filenames of the uploaded videos.
 *       '400':
 *         description: Bad Request. No file uploaded.
 *       '401':
 *         description: Unauthorized. Invalid token.
 *       '500':
 *         description: Internal Server Error. An error occurred while processing the video.
 */

router.post('/uploadvideo', uploadMiddleware('video'), projectcontroller.uploadVideo);

module.exports = router;
