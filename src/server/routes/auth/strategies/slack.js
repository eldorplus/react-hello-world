module.exports = {
  Ctor: require('passport-slack').Strategy,
  getConfig: (env) => {
    const clientID = env.auth.slack.clientID;
    const clientSecret = env.auth.slack.clientSecret;
    const callbackURL = env.auth.slack.callbackURL;
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
    profile.provider = 'slack';
    const fields = (user) => {
      user.name = profile.displayName ? profile.displayName : null;
    };
    require('./index').userSaver(fields, accessToken, refreshToken, profile, done);
  },

};
