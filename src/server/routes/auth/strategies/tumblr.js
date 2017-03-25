const _ = require('lodash');

module.exports = {
  Ctor: require('passport-tumblr').Strategy,
  getConfig: (env) => {
    const consumerKey = env.auth.tumblr.consumerKey;
    const consumerSecret = env.auth.tumblr.consumerSecret;
    const callbackURL = env.auth.google.callbackURL;
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
    require('./index').userSaver(token, tokenSecret, profile, done);
  },

};
