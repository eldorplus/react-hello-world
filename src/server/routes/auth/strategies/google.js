const _ = require('lodash');
const User = require('./../../../models/User');

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
    User.findOne({ 'google.id': profile.id }, function(err, user) {
      if (err) done(err);

      if (!user) {
        user = new User();
      }

      if(!user.email) {
        user.email = profile.emails[0] ? profile.emails[0].value : null;
      }
      if(!user.username) {
        user.username = profile.username ? profile.username : user.email;
      }
      if(!user.name) {
        user.name = profile.displayName ? profile.displayName : null;
      }
      if(!user.photo) {
        user.photo = profile.photos[0] ? profile.photos[0].value : null;
      }

      user.role = req.session.role;
      user.provider = 'google';

      user.google.id = profile.id;

      user.google.token = accessToken;
      user.google.refresh = refreshToken;
      user.google.profile = profile;

      require('./index').saver(user, done);

    });
  },

};
