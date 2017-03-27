const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const router = require('express').Router();
const User = require('./../models/User');

const walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) {
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

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

  const strategies = require('./auth/strategies').loader();
  config.logger.info(`Loading passport strategies: ${strategies.map(strategy => strategy.type).join(', ')}`);

  strategies.forEach(strategy => {
    passport.use(new strategy.Ctor(strategy.config, strategy.toUser));
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

  router.get(
    '/locale',
    (req, res) => {
      let translations = {};
      walk(path.join(__dirname, '/../../locales'), (err, files) => {
        files.forEach((file) => {
          if (file.indexOf(req.getLocale() !== -1)) {
            translations = _.merge(translations, require(file));
          }
        });
        res.json(translations);
      });
    }
  );
  require('./users')(config, passport, User, router, userRole);

  return router;
}

module.exports = setupRouter;
