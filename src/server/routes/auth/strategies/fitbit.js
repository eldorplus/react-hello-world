const _ = require('lodash');

module.exports = {
  Ctor: require('passport-fitbit-oauth2').FitbitOAuth2Strategy,
  getConfig: (env) => {
    const clientID = env.auth.fitbit.clientID;
    const clientSecret = env.auth.fitbit.clientSecret;
    const callbackURL = env.auth.fitbit.callbackURL;
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
    opts.scope = ['profile']; // 'activity','heartrate','location'
  },
  toUser: (req, accessToken, refreshToken, profile, done) => {
    console.log('fitbit', profile);
    profile.role = req.session.role;
    profile.provider = 'fitbit';
    const fields = (user) => {
      user.name = profile.displayName ? profile.displayName : null;
    };
    require('./index').userSaver(fields, accessToken, refreshToken, profile, done);
  },

};
