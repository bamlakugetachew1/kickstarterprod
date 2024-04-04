const router = require('express').Router();
const validateProject = require('../validate/validateProject');
const projectcontroller = require('../controllers/projectcontroller');

router.route('/projects').post(validateProject, projectcontroller.createproject);

module.exports = router;
