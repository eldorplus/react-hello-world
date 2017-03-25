const _ = require('lodash');

module.exports = {
  Ctor: require('passport-foursquare').Strategy,
  getConfig: (env) => {
    const clientID = env.auth.foursquare.clientID;
    const clientSecret = env.auth.foursquare.clientSecret;
    const callbackURL = env.auth.foursquare.callbackURL;
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
    opts.scope = ['profile']; // 'activity','heartrate','location'
  },
  toUser: (req, accessToken, refreshToken, profile, done) => {
    console.log('foursquare', profile);
    profile.role = req.session.role;
    profile.provider = 'foursquare';
    const fields = (user) => {
      user.name = profile.displayName ? profile.displayName : null;
    };
    require('./index').userSaver(fields, accessToken, refreshToken, profile, done);
  },

};
