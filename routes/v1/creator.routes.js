const router = require('express').Router();
const validateCreator = require('../../validate/validate.creators');
const creatorcontroller = require('../../controllers/creator.controller');
const verifyToken = require('../../middlewares/verify.token');

router
  .route('')
  .post(validateCreator, creatorcontroller.createCreators)
  .get(creatorcontroller.individualCreatorsDetails);
router.post('/login', creatorcontroller.loginCreator);
router.get('/favourites', creatorcontroller.getFavourites);
router.get('/backedprojects', creatorcontroller.getBackedProjects);
router.get('/createdprojects', creatorcontroller.getMyListedProjects);
router.use(verifyToken.verifyToken);
router.patch('/updateaccount', creatorcontroller.updateAccountDetails);
router.patch('/visibility', creatorcontroller.toggleVisibility);

module.exports = router;
