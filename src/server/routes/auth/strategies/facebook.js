const _ = require('lodash');

module.exports = {
  Ctor: require('passport-facebook').Strategy,
  getConfig: (env) => {
    const clientID = env.auth.facebook.appID;
    const clientSecret = env.auth.facebook.appSecret;
    const callbackURL = env.auth.facebook.callbackURL;
    if (clientID && clientSecret) {
      return {
        clientID,
        clientSecret,
        callbackURL,
        passReqToCallback: true,
        profileFields: ['displayName', 'name', 'photos', 'email']
      }
    }
  },
  toUser: (req, accessToken, refreshToken, profile, done) => {
    profile.role = req.session.role;
    profile.provider = 'facebook';
    require('./index').userSaver(accessToken, refreshToken, profile, done);
  }
};
