const _ = require('lodash');
const User = require('./../../../models/User');

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
    User.findOne({ 'facebook.id' :  profile.id }, function(err, user) {
      if (err) done(err);

      if (!user) {
        user = new User();
      }

      if(!user.name) {
        user.name = profile.displayName ? profile.displayName : null;
      }
      if(!user.email) {
        user.email = profile.email ? profile.email : null;
      }
      if(!user.username) {
        user.username = profile.username ? profile.username : profile.email ? profile.email : profile.id;
      }
      if(!user.photo) {
        user.photo = profile.photos[0] ? profile.photos[0].value : null;
      }

      user.role = req.session.role;
      user.provider = 'facebook';

      user.facebook.id = profile.id;

      user.facebook.token = accessToken;
      user.facebook.refresh = refreshToken;
      user.facebook.profile = profile;

      require('./index').saver(user, done);
    });
  }
};
