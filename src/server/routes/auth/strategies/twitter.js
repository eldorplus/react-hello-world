module.exports = {
  Ctor: require('passport-twitter').Strategy,
  getConfig: (env) => {
    const consumerKey = env.auth.twitter.consumerKey;
    const consumerSecret = env.auth.twitter.consumerSecret;
    const callbackURL = env.auth.twitter.callbackURL;

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
  }
};
