const _ = require('lodash');

module.exports = {
  Ctor: require('passport-tumblr').Strategy,
  getConfig: (env) => {
    const consumerKey = env.auth.tumblr.consumerKey;
    const consumerSecret = env.auth.tumblr.consumerSecret;
    const callbackURL = env.auth.tumblr.callbackURL;
    if (consumerKey && consumerSecret) {
      return {
        consumerKey,
        consumerSecret,
        callbackURL,
        passReqToCallback: true,
      }
    }
  },
  toUser: (req, token, tokenSecret, profile, done) => {
    profile.role = req.session.role;
    profile.provider = 'tumblr';
    const fields = (user) => {
      user.name = profile.username ? profile.username : null;
    };
    require('./index').userSaver(fields, token, tokenSecret, profile, done);
  },

};
