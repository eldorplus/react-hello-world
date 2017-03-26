const _ = require('lodash');

module.exports = {
  Ctor: require('passport-forcedotcom').Strategy,
  getConfig: (env) => {
    const clientID = env.auth.forcedotcom.clientID;
    const clientSecret = env.auth.forcedotcom.clientSecret;
    const callbackURL = env.auth.forcedotcom.callbackURL;
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
    opts.scope = ['profile'];
  },
  toUser: (req, accessToken, refreshToken, profile, done) => {
    profile.role = req.session.role;
    profile.provider = 'forcedotcom';
    const fields = (user) => {
      user.name = profile.displayName ? profile.displayName : null;
    };
    require('./index').userSaver(fields, accessToken, refreshToken, profile, done);
  },

};
