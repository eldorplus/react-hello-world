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
    profile.provider = 'twitter';
    const fields = (user) => {
      user.name = profile.displayName ? profile.displayName : null;
      user.email = profile.email ? profile.email : null;
      user.username = profile.username ? profile.username : profile.email ? profile.email : profile.id;
      user.photo = profile.photos && profile.photos[0] ? profile.photos[0].value : null;
    };
    require('./index').userSaver(fields, token, tokenSecret, profile, done);
  }
};