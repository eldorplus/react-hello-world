module.exports = {
  Ctor: require('passport-linkedin-oauth2').Strategy,
  getConfig: (env) => {
    const clientID = env.auth.linkedin.clientID;
    const clientSecret = env.auth.linkedin.clientSecret;
    const callbackURL = env.auth.linkedin.callbackURL;
    if (clientID && clientSecret) {
      return {
        clientID,
        clientSecret,
        callbackURL,
        passReqToCallback: true,
        state: true,
      }
    }
  },
  preHook: (req, opts) => {
    opts.scope = ['r_emailaddress', 'r_basicprofile'];
  },
  toUser: (req, token, tokenSecret, profile, done) => {
    profile.role = req.session.role;
    profile.provider = 'linkedin';
    const fields = (user) => {
      user.name = profile.displayName ? profile.displayName : null;
      user.email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
      user.username = profile.username ? profile.username : profile.email ? profile.email : profile.id;
      user.photo = profile.photos && profile.photos[0] ? profile.photos[0].value : null;
    };
    require('./index').userSaver(fields, token, tokenSecret, profile, done);
  }
};
