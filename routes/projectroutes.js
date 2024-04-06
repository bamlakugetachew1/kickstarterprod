const router = require('express').Router();
const validateProject = require('../validate/validateProject');
const projectcontroller = require('../controllers/projectcontroller');
const upload = require('../utils/multer');

router.route('/projects').post(validateProject, projectcontroller.createproject);
router.post('/projects/uploadimages', upload.array('coverimage'), projectcontroller.uploadImage);
router.post('/projects/uploadvideo', upload.array('video'), projectcontroller.uploadVideo);
router.get('/projects/readimage', projectcontroller.createImageReadStream);
router.get('/projects/readvideo', projectcontroller.createVideoReadStream);

module.exports = router;
