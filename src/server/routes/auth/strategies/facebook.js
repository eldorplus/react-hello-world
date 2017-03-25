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
        profileFields: ['id', 'displayName', 'name', 'gender', 'photos', 'email', 'profileUrl']
      }
    }
  },
  toUser: (req, accessToken, refreshToken, profile, done) => {
    profile.role = req.session.role;
    profile.provider = 'facebook';
    const fields = (user) => {
      user.name = profile.displayName ? profile.displayName : null;
      user.gender = profile.gender ? profile.gender : null;
      user.email = profile.email ? profile.email : null;
      user.username = profile.username ? profile.username : null;
      user.photo = profile.photos && profile.photos[0] ? profile.photos[0].value : null;
    };
    require('./index').userSaver(fields, accessToken, refreshToken, profile, done);
  }
};
