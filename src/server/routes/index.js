const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const router = require('express').Router();
const User = require('./../models/User');

function setupRouter(config, passport, userRole) {
  require('./../auth/jwt')(config, passport, User);

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

// const rootUrl = config.protocol + config.subDomain;

  const strategies = require('./auth/strategies').loader(config);
  console.log(`Configured strategies: ${strategies.map(strategy => strategy.type).join('/')}`);

  strategies.forEach(strategy => {
    passport.use(new strategy.Ctor(strategy.config, strategy.toUser));
    console.log(`Using login with "${strategy.type}" strategy`);
  });

  if (strategies.length > 0) {
    const conf = {};
    conf.strategies = strategies;
    conf.passport = passport;
    conf.jwtOptions = config.jwt.options;
    conf.tokenCookieName = config.jwt.tokenCookieName;
    conf.tokenSecret = config.jwt.tokenSecret;
    conf.User = User;
    const routes = require('./auth/index')(conf);
    router.get(
      '/auth/providers',
      (req, res) => {
        const s = strategies.map(strategy => strategy.type);
        let p = {};

        strategies.map(strategy => {
          let enabled = (
            (strategy.config.clientID && strategy.config.clientID !== 'ID') ||
            (strategy.config.appID && strategy.config.appID !== 'ID') ||
            (strategy.config.consumerKey && strategy.config.consumerKey !== 'KEY')
          ) ? true: false;
          if (enabled) {
            p[strategy.type] = {
              name: strategy.name,
              callbackURL: strategy.config.callbackURL,
            };
          }
        });
        res.json({strategies: s, providers: p})
      }
    );
    router.get(
      strategies.map(strategy => `/auth/${strategy.type}`),
      routes.onAuthenticationRequest
    );

    router.get(
      strategies.map(strategy => `/auth/${strategy.type}/callback`),
      routes.onAuthenticationCallback
    );

    router.post(
      '/auth/login',
      routes.onLogin
    );

    router.post(
      '/auth/register',
      routes.onRegister
    );

    router.get(
      '/auth/logout',
      routes.onLogout
    );

    router.get(
      '/auth/profile',
      passport.authenticate('jwt'),
      routes.onProfile
    );
  }

  router.get(
    '/auth/:view',
    (req, res) => {
      res.redirect('/#/auth/'+req.params.view);
    }
  );

  require('./users')(config, passport, User, router, userRole);

  return router;
}

module.exports = setupRouter;
