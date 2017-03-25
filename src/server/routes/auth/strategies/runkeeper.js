module.exports = {
  Ctor: require('passport-runkeeper').Strategy,
  getConfig: (env) => {
    const clientID = env.auth.runkeeper.clientID;
    const clientSecret = env.auth.runkeeper.clientSecret;
    const callbackURL = env.auth.runkeeper.callbackURL;
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
    profile.provider = 'runkeeper';
    const fields = (user) => {};
    require('./index').userSaver(fields, accessToken, refreshToken, profile, done);
  },

};
