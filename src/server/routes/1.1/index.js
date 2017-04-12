const router = require('express').Router();
const User = require('./../../models/User');

function setupAPI(config, passport, userRole) {
  require('./users')(config, passport, User, router, userRole); // eslint-disable-line global-require

  return router;
}

module.exports = setupAPI;