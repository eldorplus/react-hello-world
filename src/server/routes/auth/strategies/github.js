const _ = require('lodash');

module.exports = {
  Ctor: require('passport-github2').Strategy,
  getConfig: (env) => {
    const clientID = env.auth.github.clientID;
    const clientSecret = env.auth.github.clientSecret;
    const callbackURL = env.auth.github.callbackURL;
    if (clientID && clientSecret) {
      return {
        clientID,
        clientSecret,
        callbackURL,
        passReqToCallback: true,
      }
    }
  },
  preHook: (req, opts) => {
    opts.scope = ['email']
  },
  toUser: (req, accessToken, refreshToken, profile, done) => {
    profile.role = req.session.role;
    profile.provider = 'github';
    require('./index').userSaver(accessToken, refreshToken, profile, done);
  },
};
