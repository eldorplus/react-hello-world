module.exports = {
  Ctor: require('passport-amazon').Strategy,
  getConfig: (env) => {
    const clientID = env.auth.amazon.clientID;
    const clientSecret = env.auth.amazon.clientSecret;
    const callbackURL = env.auth.amazon.callbackURL;
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
    profile.provider = 'amazon';
    const fields = (user) => {
      user.name = profile.displayName ? profile.displayName : null;
      user.email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
      user.username = profile.username ? profile.username : null;
      user.photo = profile.photos && profile.photos[0] ? profile.photos[0].value : null;
    };
    require('./index').userSaver(fields, accessToken, refreshToken, profile, done);
  },

};
