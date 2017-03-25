const _ = require('lodash');

module.exports = {
  Ctor: require('passport-instagram').Strategy,
  getConfig: (env) => {
    const clientID = env.auth.instagram.clientID;
    const clientSecret = env.auth.instagram.clientSecret;
    const callbackURL = env.auth.instagram.callbackURL;
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
    opts.scope = ['email']; // 'status', 'friends', 'notify'
  },
  toUser: (req, accessToken, refreshToken, profile, done) => {
    profile.role = req.session.role;
    profile.provider = 'instagram';
    const fields = (user) => {
      user.name = profile.displayName ? profile.displayName : null;
      user.email = profile.email ? profile.email : null;
      user.username = profile.username ? profile.username : null;
      user.photo = profile.photos && profile.photos[0] ? profile.photos[0].value : null;
    };
    require('./index').userSaver(fields, accessToken, refreshToken, profile, done);
  },

};
