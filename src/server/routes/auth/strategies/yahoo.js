module.exports = {
  Ctor: require('passport-yahoo-token').Strategy,
  getConfig: (env) => {
    const clientID = env.auth.yahoo.clientID;
    const clientSecret = env.auth.yahoo.clientSecret;
    const authorizationURL = 'https://api.login.yahoo.com/oauth2/request_auth';
    const tokenURL = 'https://api.login.yahoo.com/oauth2/get_token';
    if (clientID && clientSecret) {
      return {
        clientID,
        clientSecret,
        authorizationURL,
        tokenURL,
        passReqToCallback: true,
      }
    }
  },
  toUser: (req, accessToken, refreshToken, profile, done) => {
    profile.role = req.session.role;
    profile.provider = 'yahoo';
    const fields = (user) => {
      user.name = profile.displayName ? profile.displayName : null;
      user.email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
      user.username = profile.username ? profile.username : null;
      user.photo = profile.photos && profile.photos[0] ? profile.photos[0].value : null;
    };
    require('./index').userSaver(fields, accessToken, refreshToken, profile, done);
  },

};
