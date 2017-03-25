module.exports = {
  Ctor: require('passport-reddit').Strategy,
  getConfig: (env) => {
    const clientID = env.auth.reddit.clientID;
    const clientSecret = env.auth.reddit.clientSecret;
    const callbackURL = env.auth.reddit.callbackURL;
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
    req.session.state = require('crypto').randomBytes(32).toString('hex');
    opts.state = req.session.state;
    opts.duration = 'permanent';
  },
  toUser: (req, accessToken, refreshToken, profile, done) => {
    profile.role = req.session.role;
    profile.provider = 'reddit';
    require('./index').userSaver(accessToken, refreshToken, profile, done);
  },
};
