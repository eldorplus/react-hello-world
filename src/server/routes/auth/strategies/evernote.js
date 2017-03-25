module.exports = {
  Ctor: require('passport-evernote').Strategy,
  getConfig: (env) => {
    const consumerKey = env.auth.evernote.consumerKey;
    const consumerSecret = env.auth.evernote.consumerSecret;
    const callbackURL = env.auth.evernote.callbackURL;

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
    profile.provider = 'evernote';
    const fields = (user) => {
      user.name = profile.displayName ? profile.displayName : null;
      user.email = profile.email ? profile.email : null;
      user.username = profile.username ? profile.username : profile.email ? profile.email : profile.id;
      user.photo = profile.photos && profile.photos[0] ? profile.photos[0].value : null;
    };
    require('./index').userSaver(fields, token, tokenSecret, profile, done);
  }
};
