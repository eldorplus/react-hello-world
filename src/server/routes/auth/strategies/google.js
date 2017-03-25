const _ = require('lodash');

module.exports = {
  Ctor: require('passport-google-oauth20').Strategy,
  getConfig: (env) => {
    const clientID = env.auth.google.clientID;
    const clientSecret = env.auth.google.clientSecret;
    const callbackURL = env.auth.google.callbackURL;
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
    profile.provider = 'google';
    require('./index').userSaver(accessToken, refreshToken, profile, done);
  },

};
