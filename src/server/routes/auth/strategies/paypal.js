module.exports = {
  Ctor: require('passport-paypal-oauth').Strategy,
  getConfig: (env) => {
    const clientID = env.auth.paypal.clientID;
    const clientSecret = env.auth.paypal.clientSecret;
    const callbackURL = env.auth.paypal.callbackURL;
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
    profile.provider = 'paypal';
    const fields = (user) => {
      user.name = profile.displayName ? profile.displayName : null;
      user.email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
    };
    require('./index').userSaver(fields, accessToken, refreshToken, profile, done);
  },

};
