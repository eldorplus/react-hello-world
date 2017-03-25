module.exports = {
  Ctor: require('passport-rightsignature').Strategy,
  getConfig: (env) => {
    const clientID = env.auth.rightsignature.clientID;
    const clientSecret = env.auth.rightsignature.clientSecret;
    const callbackURL = env.auth.rightsignature.callbackURL;
    if (clientID && clientSecret) {
      return {
        clientID,
        clientSecret,
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
