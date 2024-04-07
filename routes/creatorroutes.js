const router = require('express').Router();
const validateCreator = require('../validate/validateCreators');
const creatorcontroller = require('../controllers/creatorcontroller');
// const verifyToken = require('../utils/verifyToken');

router
  .route('/creator')
  .post(validateCreator, creatorcontroller.createcreators)
  .get(creatorcontroller.indivisualCreatorsDetails);
router.route('/creator/login').post(creatorcontroller.loginCreator);
router.route('/creator/favourites').get(creatorcontroller.getFavourites);
router.route('/creator/backedprojects').get(creatorcontroller.getBackedProjects);
router.route('/creator/createdprojects').get(creatorcontroller.getMyListedProjects);

module.exports = router;
