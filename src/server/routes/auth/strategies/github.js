const _ = require('lodash');
const User = require('./../../../models/User');

module.exports = {
  Ctor: require('passport-github2').Strategy,
  getConfig: (env) => {
    const clientID = env.auth.github.clientID;
    const clientSecret = env.auth.github.clientSecret;
    const callbackURL = env.auth.github.callbackURL;
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
    User.findOne({ 'github.id' :  profile.id }, function(err, user) {
      if (err) done(err);

      if (!user) {
        user = new User();
      }

      if(!user.username) {
        user.username = profile.username ? profile.username : null;
      }

      if(!user.name) {
        user.name = profile.displayName ? profile.displayName : null;
      }
      if(!user.photo) {
        user.photo = profile._json.avatar_url ? profile._json.avatar_url : null;
      }

      user.role = req.session.role;
      user.provider = 'github';

      user.github.id = profile.id;

      user.github.token = accessToken;
      user.github.refresh = refreshToken;
      user.github.profile = profile;

      require('./index').saver(user, done);

    });
  },
};
