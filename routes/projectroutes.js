const router = require('express').Router();
const validateProject = require('../validate/validateProject');
const projectcontroller = require('../controllers/projectcontroller');
const upload = require('../utils/multer');
const verifyToken = require('../utils/verifyToken');

router
  .route('/projects')
  .post(verifyToken.verifyToken, validateProject, projectcontroller.createproject)
  .get(projectcontroller.getAllProject);
router.post('/projects/uploadimages', upload.array('coverimage'), projectcontroller.uploadImage);
router.post('/projects/uploadvideo', upload.array('video'), projectcontroller.uploadVideo);
router.get('/projects/readimage', projectcontroller.createImageReadStream);
router.get('/projects/readvideo', projectcontroller.createVideoReadStream);
router.get('/projects/recomended', projectcontroller.getRecomendedProject);
router.get('/projects/stats', projectcontroller.getOverallPlatformStatus);
router.get('/projects/single', projectcontroller.getSingleProject);
router.get('/projects/search', projectcontroller.searchprojects);
router.get('/projects/singleprojectmetrics', projectcontroller.getSingleProjectStatus);
router.get('/projects/recentfivebackers', projectcontroller.getRecentFiveBackers);
router.delete('/projects/deleteproject/:projectid', verifyToken.verifyToken, projectcontroller.deleteProject);
router.patch('/projects/updateproject', verifyToken.verifyToken, projectcontroller.updateproject);

module.exports = router;
