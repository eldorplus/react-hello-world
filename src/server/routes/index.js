const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const router = require('express').Router();
const User = require('./../models/User');
const Url = require('./../models/Url').Url;
const base58 = require('./../_lib/base58');
const walk = require('./../_lib/path').walk;

function setupRouter(config, passport, userRole) {
  require('./../auth/jwt')(config, passport, User); // eslint-disable-line global-require

  router.get('/version', (req, res) => {
    const data = {};
    data[`${config.name}`] = {
      version: config.version,
      env: config.env,
      versions: config.apiVersions,
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

  const strategies = require('./auth/strategies').loader(); // eslint-disable-line global-require
  config.logger.info(`Loading passport strategies: ${strategies.map((strategy) => { return strategy.type; }).join(', ')}`);

  strategies.map((strategy) => { passport.use(new strategy.Ctor(strategy.config, strategy.toUser)); return strategy; });

  if (strategies.length > 0) {
    const conf = {};
    conf.strategies = strategies;
    conf.passport = passport;
    conf.jwtOptions = config.jwt.options;
    conf.tokenCookieName = config.jwt.tokenCookieName;
    conf.tokenSecret = config.jwt.tokenSecret;
    conf.User = User;
    const routes = require('./auth/index')(conf); // eslint-disable-line global-require
    router.get('/auth/providers', (req, res) => {
      const s = strategies.map((strategy) => { return strategy.type; });
      const p = {};

      strategies.map((strategy) => {
        if ((strategy.config.clientID && strategy.config.clientID !== 'ID') ||
          (strategy.config.appID && strategy.config.appID !== 'ID') ||
          (strategy.config.consumerKey && strategy.config.consumerKey !== 'KEY')
        ) {
          p[strategy.type] = {
            name: strategy.name,
            callbackURL: strategy.config.callbackURL,
          };
        }
        return strategy;
      });
      res.json({ strategies: s, providers: p });
    });
    router.get(strategies.map((strategy) => { return `/auth/${strategy.type}`; }), routes.onAuthenticationRequest); // eslint-disable-line max-len

    router.get(strategies.map((strategy) => { return `/auth/${strategy.type}/callback`; }), routes.onAuthenticationCallback); // eslint-disable-line max-len

    router.post('/auth/login', routes.onLogin);

    router.post('/auth/register', routes.onRegister);

    router.get('/auth/logout', routes.onLogout);

    router.get('/auth/profile', passport.authenticate('jwt'), routes.onProfile);
  }

  router.get('/auth/:view', (req, res) => {
    res.redirect(`/#/auth/${req.params.view}`);
  });

  router.get('/locale', (req, res) => {
    let translations = {};
    walk(config.i18n.directory, (err, files) => {
      files.map((file) => {
        if (path.basename(file).replace(config.i18n.extension, '') === req.getLocale()) {
          translations = _.merge(translations, require(file)); // eslint-disable-line global-require,import/no-dynamic-require,max-len
        }
      });
      return res.json(translations);
    });
  });

  router.get('/urls/:id',
    (req, res) => {
      var id = base58.decode(req.params.id);

      Url.findOne({_id: id}, function (err, doc){
        if (doc) {
          const redirectUrl = doc.long_url;
          return res.render('redirect', {url: redirectUrl});
        } else {
          return res.redirect('/');
        }
      });
    });

  return router;
}

module.exports = setupRouter;