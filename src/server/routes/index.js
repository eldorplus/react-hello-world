const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const router = require('express').Router();
const passport = require('passport');
const config = require('./../config');
// const User = require('./../models/User');

router.get('/version', (req, res) => {
  const data = {};
  data[`${config.name}`] = {
    version: config.version,
    env: config.env,
  };
  if (config.env !== 'production') {
    data[`${config.name}`].coverage = fs.readdirSync(path.join(__dirname, './../../../coverage'))
      .map((item) => {
        return `http://${config.host}:${config.port}/${item}`;
      });
  }
  res.json(data);
});

const rootUrl = config.protocol + config.subDomain;

const strategies = require('./auth/strategies')(config);
console.log(`Configured strategies: ${strategies.map(strategy => strategy.type).join('/')}`);

strategies.forEach(strategy => {
  passport.use(new strategy.Ctor(strategy.config, strategy.toUser));
  console.log(`Using login with "${strategy.type}" strategy`);
});

if (strategies.length > 0) {
  config.strategies = strategies;
  config.passport = passport;
  const routes = require('./auth/index')(config);
  router.get(
    strategies.map(strategy => `/auth/${strategy.type}`),
    routes.onAuthenticationRequest
  );

  router.get(
    strategies.map(strategy => `/auth/${strategy.type}/callback`),
    routes.onAuthenticationCallback
  );

  router.get(
    '/auth/logout',
    routes.onLogout
  );

  router.get(
    '/user',
    routes.onIndex
  );

  router.get(
    '/profile',
    isLoggedIn,
    routes.onProfile
  );
}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}

module.exports = router;
