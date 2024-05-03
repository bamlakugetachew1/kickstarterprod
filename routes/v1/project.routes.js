const router = require('express').Router();
const validateProject = require('../../validate/validate.project');
const projectcontroller = require('../../controllers/project.controller');
const upload = require('../../utils/multer');
const verifyToken = require('../../middlewares/verify.token');

router
  .route('')
  .post(verifyToken.verifyToken, validateProject, projectcontroller.createProject)
  .get(projectcontroller.getAllProject);
router.post('/uploadimages', upload.array('coverimage'), projectcontroller.uploadImage);
router.post('/uploadvideo', upload.array('video'), projectcontroller.uploadVideo);
router.get('/readimage', projectcontroller.streamImage);
router.get('/readvideo', projectcontroller.streamVideo);
router.get('/recomended', projectcontroller.getRecomendedProject);
router.get('/stats', projectcontroller.getOverallPlatformStatus);
router.get('/single', projectcontroller.getSingleProject);
router.get('/search', projectcontroller.searchProjects);
router.get('/singleprojectmetrics', projectcontroller.getSingleProjectStatus);
router.get('/recentfivebackers', projectcontroller.getRecentFiveBackers);
router.delete('/deleteproject/:projectid', verifyToken.verifyToken, projectcontroller.deleteProject);
router.patch('/updateproject', verifyToken.verifyToken, projectcontroller.updateProject);

module.exports = router;
