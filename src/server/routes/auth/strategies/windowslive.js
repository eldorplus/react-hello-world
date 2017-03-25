const _ = require('lodash');

module.exports = {
  Ctor: require('passport-windowslive').Strategy,
  getConfig: (env) => {
    const clientID = env.auth.windowslive.clientID;
    const clientSecret = env.auth.windowslive.clientSecret;
    const callbackURL = env.auth.windowslive.callbackURL;
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
    opts.scope = ['wl.basic'];
  },
  toUser: (req, accessToken, refreshToken, profile, done) => {
    console.log('windowslive', profile);
    profile.role = req.session.role;
    profile.provider = 'windowslive';
    const fields = (user) => {
      user.name = profile.displayName ? profile.displayName : null;
      user.email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
      user.username = profile.username ? profile.username : null;
      user.photo = profile.photos && profile.photos[0] ? profile.photos[0].value : null;
    };
    require('./index').userSaver(fields, accessToken, refreshToken, profile, done);
  },

};
