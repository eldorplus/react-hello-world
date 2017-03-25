const _ = require('lodash');

module.exports = {
  Ctor: require('passport-vkontakte').Strategy,
  getConfig: (env) => {
    const clientID = env.auth.vkontakte.clientID;
    const clientSecret = env.auth.vkontakte.clientSecret;
    const callbackURL = env.auth.vkontakte.callbackURL;
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
    profile.provider = 'vkontakte';
    const fields = (user) => {
      user.name = profile.displayName ? profile.displayName : null;
      user.email = profile.email ? profile.email : null;
      user.username = profile.username ? profile.username : null;
      user.photo = profile.photos && profile.photos[0] ? profile.photos[0].value : null;
      switch(profile.sex) {
        case 2:
          user.gender = 'male';
          break;
        case 1:
          user.gender = 'female'; //? valid
          break;
        default:
          user.gender = null;
      }
    };
    require('./index').userSaver(fields, accessToken, refreshToken, profile, done);
  },

};
