module.exports = {
  Ctor: require('passport-rightsignature').Strategy,
  getConfig: (env) => {
    const consumerKey = env.auth.rightsignature.consumerKey;
    const consumerSecret = env.auth.rightsignature.consumerSecret;
    const callbackURL = env.auth.rightsignature.callbackURL;
    if (consumerKey && consumerSecret) {
      return {
        consumerKey,
        consumerSecret,
        callbackURL,
        passReqToCallback: true,
      }
    }
  },
  toUser: (req, accessToken, refreshToken, profile, done) => {
    profile.role = req.session.role;
    profile.provider = 'rightsignature';
    const fields = (user) => {
      user.name = profile.name ? profile.name : null;
      user.email = profile.email ? profile.email : null;
    };
    require('./index').userSaver(fields, accessToken, refreshToken, profile, done);
  },

};
