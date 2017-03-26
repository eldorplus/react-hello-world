const _ = require('lodash');

module.exports = {
  Ctor: require('passport-bnet').Strategy,
  getConfig: (env) => {
    const clientID = env.auth.bnet.clientID;
    const clientSecret = env.auth.bnet.clientSecret;
    const callbackURL = env.auth.bnet.callbackURL;
    if (clientID && clientSecret) {
      return {
        clientID,
        clientSecret,
        callbackURL,
        region: 'us',
        passReqToCallback: true,
      }
    }
  },
  preHook: (req, opts) => {
    opts.scope = ['wow.profile', 'sc2.profile'];
  },
  toUser: (req, accessToken, refreshToken, profile, done) => {
    profile.role = req.session.role;
    profile.provider = 'bnet';
    const fields = (user) => {
      user.name = profile.displayName ? profile.displayName : null;
      user.email = profile.email ? profile.email : null;
      user.username = profile.username ? profile.username : null;
      user.photo = profile.photos && profile.photos[0] ? profile.photos[0].value : null;
    };
    require('./index').userSaver(fields, accessToken, refreshToken, profile, done);
  },

};
