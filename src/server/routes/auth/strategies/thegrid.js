module.exports = {
  Ctor: require('passport-thegrid').Strategy,
  getConfig: (env) => {
    const clientID = env.auth.thegrid.clientID;
    const clientSecret = env.auth.thegrid.clientSecret;
    const callbackURL = env.auth.thegrid.callbackURL;
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
    profile.provider = 'thegrid';
    const fields = (user) => {
      user.name = profile.displayName ? profile.displayName : null;
      user.email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
      user.username = profile.username ? profile.username : null;
      user.photo = profile.photos && profile.photos[0] ? profile.photos[0].value : null;
    };
    require('./index').userSaver(fields, accessToken, refreshToken, profile, done);
  },

};
