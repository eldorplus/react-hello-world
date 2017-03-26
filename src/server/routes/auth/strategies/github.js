module.exports = {
  Ctor: require('passport-github2').Strategy,
  getConfig: (env) => {
    const clientID = env.auth.github.clientID;
    const clientSecret = env.auth.github.clientSecret;
    const callbackURL = env.auth.github.callbackURL;
    if (clientID && clientSecret) {
      return {
        clientID,
        clientSecret,
        callbackURL,
        passReqToCallback: true,
      }
    }
  },
  preHook: (req, opts) => {
    opts.scope = ['email']
  },
  toUser: (req, accessToken, refreshToken, profile, done) => {
    profile.role = req.session.role;
    profile.provider = 'github';
    const fields = (user) => {
      user.name = profile.displayName ? profile.displayName : null;
      user.email = profile.email ? profile.email : null;
      user.username = profile.username ? profile.username : null;
      user.photo = profile._json && profile._json.avatar_url ? profile._json.avatar_url : null;
    };
    require('./index').userSaver(fields, accessToken, refreshToken, profile, done);
  },
};