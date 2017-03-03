const _ = require('lodash');
const jwt = require('jsonwebtoken');

// from https://github.com/lipp/login-with/blob/master/src/routes.js

const cookieOpts = ({ httpOnly, reset = false, domain, maxAge = false }) => ({
  secure: true,
  httpOnly,
  domain,
  expires: reset ? new Date() : null,
  maxAge: !reset ? maxAge : maxAge,
});

module.exports = ({
  strategies,
  passport,
  tokenCookieName,
  tokenSecret,
  profileCookieName,
  cookieDomain,
  maxAge = false,
}) => ({
  onAuthenticationRequest: (req, res, next) => {
    const type = req.path.split('/')[2];
    const strategy = strategies.find(strategy => strategy.type === type);
    const opts = {};
    req.session.success = req.query.success;
    req.session.failure = req.query.failure;
    if (_.includes(['developer', 'manager', 'admin'], req.query.role)) {
      req.session.role = req.query.role;
    } else {
      req.session.role = 'developer'
    }
    if (strategy.preHook) {
      strategy.preHook(req, opts);
    }
    passport.authenticate(type, opts)(req, res, next);
  },
  onAuthenticationCallback: (req, res, next) => {
    const type = req.path.split('/')[2];
    passport.authenticate(type, (error, user) => {
      if (error) {
        res.cookie(tokenCookieName, '');
        res.cookie(profileCookieName, JSON.stringify({error}));
        if (req.session.failure) {
          return res.redirect(decodeURIComponent(req.session.failure))
        }
      } else if (user) {
        user.profile.userRole = req.session.role;
        res.cookie(tokenCookieName, jwt.sign(user, tokenSecret));
        res.cookie(profileCookieName, JSON.stringify(user.profile));
        if (req.session.success) {
          return res.redirect(decodeURIComponent(req.session.success))
        }
      }
      return res.json({error, user});

    })(req, res)
  },
  onLogout: (req, res) => {
    res.cookie(tokenCookieName, '');
    res.cookie(profileCookieName, '');
    if (req.query.success) {
      return res.redirect(decodeURIComponent(req.query.success))
    }
    return res.json({status: 'logged out'})
  },
  onIndex: (req, res) => {
    return res.json({token: req.cookies[tokenCookieName], profile: req.cookies[profileCookieName]})
  },
  onProfile: (req, res) => {
    return res.json({profile: req.cookies[profileCookieName]})
  }
});
