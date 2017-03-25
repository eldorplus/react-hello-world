module.exports = {
  Ctor: require('passport-soundcloud').Strategy,
  getConfig: (env) => {
    const clientID = env.auth.soundcloud.clientID;
    const clientSecret = env.auth.soundcloud.clientSecret;
    const callbackURL = env.auth.soundcloud.callbackURL;
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
    profile.provider = 'soundcloud';
    const fields = (user) => {
      user.name = profile.displayName ? profile.displayName : null;
      user.email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
    };
    require('./index').userSaver(fields, accessToken, refreshToken, profile, done);
  },

};
