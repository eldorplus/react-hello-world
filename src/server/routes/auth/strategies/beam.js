module.exports = {
  Ctor: require('passport-beam').Strategy,
  getConfig: (env) => {
    const clientID = env.auth.beam.clientID;
    const clientSecret = env.auth.beam.clientSecret;
    const callbackURL = env.auth.beam.callbackURL;
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
    profile.provider = 'beam';
    require('./index').userSaver(accessToken, refreshToken, profile, done);
  }
};
