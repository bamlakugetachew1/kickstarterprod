const express = require('express');
const projectroutes = require('./project.routes');
const creatorroutes = require('./creator.routes');
const followerroutes = require('./follower.routes');
const paymmentroutes = require('./payment.routes');
const favoriteroutes = require('./favourites.routes');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/projects',
    route: projectroutes,
  },
  {
    path: '/creator',
    route: creatorroutes,
  },
  {
    path: '/favourites',
    route: favoriteroutes,
  },
  {
    path: '/payment',
    route: paymmentroutes,
  },
  {
    path: '/follower',
    route: followerroutes,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
